#!/usr/bin/env python3
"""Live health and staleness check for Open Robotics Nexus. Read-only; fails loudly.

  python3 ops/health.py                         check the live site
  python3 ops/health.py --wait-build <sha>      first wait for the Pages build of <sha>
                                                (requests one if none starts; needs GITHUB_TOKEN)

Checks: the interactive pages and their assets, every sitemap URL, the ranking hub, the nightly
data's age, a sample of badges, the IndexNow key file, the host-root robots.txt pointing at this
site's sitemap, and the icon CDN the pages load.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from common import Checks, fetch, sitemap_locs, wait_for_pages_build  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
BASE = (os.environ.get("ORN_BASE_URL") or "https://theguysaccount.github.io/open-robotics-nexus/").rstrip("/") + "/"
PAGES = ["", "lanes.html", "lane.html?lane=Arms", "project.html?id=parol6", "agents.html", "ai.html", "app.js", "styles.css"]
WARN_HOURS, FAIL_HOURS = 30, 72  # the refresh runs nightly
LUCIDE = "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"


def hours_ago(stamp: str) -> float:
    dt = datetime.strptime(stamp, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
    return (datetime.now(timezone.utc) - dt).total_seconds() / 3600


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="Live health check for Open Robotics Nexus.")
    ap.add_argument("--wait-build", metavar="SHA", help="wait for the Pages build of this commit first")
    args = ap.parse_args(argv)
    c = Checks("Open Robotics Nexus health")
    if args.wait_build:
        repo = os.environ.get("GITHUB_REPOSITORY", "theguysaccount/open-robotics-nexus")
        built, detail = wait_for_pages_build(repo, args.wait_build, request_after=90)
        (c.ok if built else c.fail)("Pages build", detail)

    for path in PAGES:
        status, _, _, body, err = fetch(BASE + path, tries=3)
        marker = b"projects" if path == "app.js" else b"app-shell" if path == "styles.css" else b"Open Robotics"
        if status == 200 and marker in body:
            c.ok(f"/{path}")
        else:
            c.fail(f"/{path}", f"HTTP {status} {err}".strip() if status != 200 else "answered 200 without the expected content")

    status, _, _, body, err = fetch(BASE + "sitemap.xml", tries=3)
    kind, urls = sitemap_locs(body) if status == 200 else ("", [])
    if kind != "urlset" or not urls:
        c.fail("sitemap.xml", f"HTTP {status} {err}".strip() if status != 200 else "not a urlset")
    else:
        with ThreadPoolExecutor(max_workers=8) as pool:
            bad = [(u, r[0]) for u, r in pool.map(lambda u: (u, fetch(u, tries=3, limit=400_000)), urls) if r[0] != 200]
        for u, st in bad[:15]:
            c.fail(f"sitemap URL {u}", f"HTTP {st}")
        if not bad:
            c.ok("every sitemap URL answers 200", f"{len(urls)} URLs")

    status, _, _, body, err = fetch(BASE + "data/github-stats.json", tries=3)
    try:
        data = json.loads(body) if status == 200 else None
    except ValueError:
        data = None
    if not data:
        c.fail("nightly data", f"data/github-stats.json: HTTP {status} {err}".strip())
    else:
        age = hours_ago(data["generated_at"])
        stale = [k for k, v in data["projects"].items() if v.get("stale_since")]
        detail = f"refreshed {age:.0f} h ago ({data['generated_at']}), {len(data['projects'])} repos"
        if age > FAIL_HOURS:
            c.fail("nightly data", detail + "; check the Refresh workflow")
        elif age > WARN_HOURS:
            c.warn("nightly data", detail)
        else:
            c.ok("nightly data", detail)
        if stale:
            c.warn("unreadable repos", f"{len(stale)} kept from an earlier run: {', '.join(stale[:8])}")
        for pid in list(data["projects"])[:3]:
            status, _, headers, body, err = fetch(f"{BASE}badges/{pid}.svg", tries=3)
            ok = status == 200 and body.startswith(b"<svg") and "svg" in headers.get("content-type", "")
            (c.ok if ok else c.fail)(f"badge {pid}", f"HTTP {status} {headers.get('content-type', '')}")

    keys = [p for p in ROOT.glob("*.txt") if len(p.stem) == 32]
    for key in keys[:1]:
        status, _, _, body, err = fetch(BASE + key.name, tries=3)
        ok = status == 200 and body.decode("utf-8", "replace").strip() == key.stem
        (c.ok if ok else c.fail)("IndexNow key file", f"HTTP {status}")

    host_root = BASE.split("/", 3)[:3]
    status, _, _, body, err = fetch("/".join(host_root) + "/robots.txt", tries=2)
    if status == 200 and f"Sitemap: {BASE}sitemap.xml".encode() in body:
        c.ok("host robots.txt lists this sitemap")
    else:  # the host-root repo regenerates daily; a new sitemap appears there within a day
        c.warn("host robots.txt lists this sitemap", f"HTTP {status}; not listed yet")

    status, _, _, _, err = fetch(LUCIDE, tries=2, limit=50_000)
    (c.ok if status == 200 else c.warn)("icon CDN (lucide@latest)", f"HTTP {status} {err}".strip())
    return c.finish()


if __name__ == "__main__":
    sys.exit(main())
