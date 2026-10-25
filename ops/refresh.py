#!/usr/bin/env python3
"""Nightly refresh: pull live GitHub signals for every catalog repo and score openness from
what each repository actually contains.

  python3 ops/refresh.py          fetch everything, write data/github-stats.json (needs GITHUB_TOKEN)
  python3 ops/refresh.py --only parol6,lerobot    refresh a few entries (keeps the rest)

Per repo (4 API calls): stars, forks, open issues, license, archived flag; the latest release;
commits on the default branch in the last 90 days; and the full file tree, which is matched
against the artifact rules below to decide which of the seven open artifacts are present
(code, CAD, BOM, docs, firmware, simulation, license).

Fails safely: a repo that can't be read keeps its last good entry (marked stale); if more than
half the repos fail at once (rate limit, API outage) nothing is written and the run exits 1, so
the last good data and pages stay live.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import catalog  # noqa: E402
from common import UA, annotate  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
STATS = ROOT / "data" / "github-stats.json"
ARTIFACTS = ("code", "cad", "bom", "docs", "firmware", "sim", "license")

# Each artifact is found by file extension, by a directory name anywhere in the path, or by a
# file-name pattern. Examples of what matched are kept as evidence on the project page.
RULES = {
    "code": {"ext": {".py", ".cpp", ".cc", ".cxx", ".c", ".h", ".hpp", ".rs", ".js", ".ts", ".go", ".java", ".jl",
                     ".ipynb", ".m", ".cs", ".swift", ".kt"}},
    "cad": {"ext": {".step", ".stp", ".stl", ".f3d", ".f3z", ".fcstd", ".sldprt", ".sldasm", ".iges", ".igs", ".3mf",
                    ".scad", ".dxf", ".ipt", ".iam", ".x_t", ".3dm", ".skp", ".blend"},
            "dirs": {"cad", "mechanical", "stl", "step", "3d_models", "3d-models", "3d-print", "3dprint", "printed_parts"}},
    "bom": {"name": re.compile(r"(^|[/_. -])(bom|bill[-_ ]?of[-_ ]?materials?|parts[-_ ]?list)([/_. -]|$)", re.I),
            "dirs": {"bom"}},
    "docs": {"dirs": {"docs", "doc", "documentation", "wiki", "guide", "guides", "manual", "tutorials"},
             "name": re.compile(r"(^|/)(mkdocs\.ya?ml|docusaurus\.config\.[jt]s|conf\.py|book\.toml|SUMMARY\.md)$", re.I)},
    "firmware": {"ext": {".ino", ".hex", ".uf2"},
                 "dirs": {"firmware", "fw", "arduino", "esp32", "stm32", "embedded", "mcu", "microcontroller"},
                 "name": re.compile(r"(^|/)(platformio\.ini|sdkconfig[^/]*|\.cproject)$", re.I)},
    "sim": {"ext": {".urdf", ".xacro", ".mjcf", ".sdf", ".usd", ".usda", ".usdz"},
            "dirs": {"urdf", "mjcf", "sim", "simulation", "gazebo", "mujoco", "isaac", "isaacsim", "isaaclab",
                     "sim2real", "sim2sim"},
            "name": re.compile(r"(^|/)[^/]*(mujoco|isaac|gazebo|pybullet|webots)[^/]*\.(py|xml|launch|yaml|json)$", re.I)},
    "license": {"name": re.compile(r"^(LICEN[CS]E|COPYING)([._-][^/]*)?$", re.I)},
}


def detect(paths: list[str]) -> dict:
    """{artifact: {"found": bool, "count": n, "examples": [...]}} for a repository file list."""
    found = {a: [] for a in ARTIFACTS}
    for path in paths:
        low = path.lower()
        parts = low.split("/")
        ext = "." + low.rsplit(".", 1)[-1] if "." in parts[-1] else ""
        for art, rule in RULES.items():
            if (ext and ext in rule.get("ext", ())) or any(d in rule.get("dirs", ()) for d in parts[:-1]) \
                    or (rule.get("name") and rule["name"].search(path)):
                found[art].append(path)
    return {a: {"found": bool(v), "count": len(v), "examples": sorted(v, key=lambda p: (p.count("/"), p))[:3]}
            for a, v in found.items()}


def api(path: str) -> tuple[int, object]:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    req = urllib.request.Request(f"https://api.github.com/{path}", headers={
        "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": UA,
        **({"Authorization": f"Bearer {token}"} if token else {})})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.status, json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code in (403, 429) and e.headers.get("x-ratelimit-remaining") == "0":
                return e.code, {"message": "rate limited"}
            if e.code < 500:
                return e.code, None
        except (urllib.error.URLError, OSError, ValueError):
            pass
        time.sleep(5 * (attempt + 1))
    return 0, None


def fetch_repo(repo: str, now: datetime) -> dict:
    status, meta = api(f"repos/{repo}")
    if status != 200 or not isinstance(meta, dict):
        raise RuntimeError(f"repo metadata: HTTP {status}")
    full = meta["full_name"]  # follows renames and transfers
    branch = meta.get("default_branch") or "main"
    entry = {
        "repo": full, "url": meta.get("html_url"), "stars": meta.get("stargazers_count", 0),
        "forks": meta.get("forks_count", 0), "open_issues": meta.get("open_issues_count", 0),
        "license": (meta.get("license") or {}).get("spdx_id") or None, "archived": bool(meta.get("archived")),
        "default_branch": branch, "pushed_at": meta.get("pushed_at"), "description": meta.get("description") or "",
    }
    status, rel = api(f"repos/{full}/releases/latest")
    entry["latest_release"] = ({"tag": rel.get("tag_name"), "published_at": rel.get("published_at"), "url": rel.get("html_url")}
                               if status == 200 and isinstance(rel, dict) else None)
    since = (now - timedelta(days=90)).strftime("%Y-%m-%dT%H:%M:%SZ")
    status, commits = api(f"repos/{full}/commits?sha={branch}&since={since}&per_page=100")
    commits = commits if status == 200 and isinstance(commits, list) else []
    entry["commits_90d"] = len(commits)
    entry["commits_90d_capped"] = len(commits) == 100
    if commits:
        entry["last_commit_at"] = commits[0]["commit"]["committer"]["date"]
    else:
        status, last = api(f"repos/{full}/commits?sha={branch}&per_page=1")
        entry["last_commit_at"] = last[0]["commit"]["committer"]["date"] if status == 200 and last else None
    status, tree = api(f"repos/{full}/git/trees/{branch}?recursive=1")
    if status != 200 or not isinstance(tree, dict):
        raise RuntimeError(f"file tree: HTTP {status}")
    paths = [t["path"] for t in tree.get("tree", []) if t.get("type") == "blob"]
    # Submodules aren't expanded in the tree; their names still count as directories.
    submodules = [t["path"] for t in tree.get("tree", []) if t.get("type") == "commit"]
    entry["files"] = len(paths)
    entry["submodules"] = submodules
    entry["tree_truncated"] = bool(tree.get("truncated"))
    entry["artifacts"] = detect(paths + [f"{s}/" for s in submodules])
    if entry["license"] and entry["license"] != "NOASSERTION":
        entry["artifacts"]["license"]["found"] = True
    entry["openness"] = sum(1 for a in ARTIFACTS if entry["artifacts"][a]["found"])
    return entry


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="Refresh GitHub signals and openness scores for the catalog.")
    ap.add_argument("--only", help="comma-separated catalog ids to refresh")
    args = ap.parse_args(argv)
    now = datetime.now(timezone.utc).replace(microsecond=0)
    stamp = now.strftime("%Y-%m-%dT%H:%M:%SZ")
    projects, _ = catalog.load()
    previous = json.loads(STATS.read_text(encoding="utf-8")) if STATS.exists() else {"projects": {}}
    only = set(args.only.split(",")) if args.only else None

    out, failures, tried = {}, [], 0
    for p in projects:
        repo = catalog.github_repo(p["url"])
        if not repo:
            continue
        old = previous["projects"].get(p["id"])
        if only and p["id"] not in only:
            if old:
                out[p["id"]] = old
            continue
        tried += 1
        try:
            entry = fetch_repo(repo, now)
            entry["checked_at"] = stamp
            out[p["id"]] = entry
            print(f"{p['id']:<28} {entry['repo']:<45} ★{entry['stars']:<6} openness {entry['openness']}/7")
        except Exception as e:
            failures.append(p["id"])
            annotate("warning", f"{p['id']} ({repo}): {e}; keeping the last good entry")
            if old:
                out[p["id"]] = dict(old, stale_since=old.get("stale_since") or stamp, error=str(e))
    if tried and len(failures) > tried / 2:
        annotate("error", f"{len(failures)} of {tried} repos failed (rate limit or API outage); nothing written, "
                          "the last good data stays live.")
        return 1
    STATS.parent.mkdir(parents=True, exist_ok=True)
    STATS.write_text(json.dumps({"generated_at": stamp, "source": "GitHub REST API", "artifacts": list(ARTIFACTS),
                                 "projects": out}, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {STATS.relative_to(ROOT)}: {len(out)} repos, {len(failures)} failed this run.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
