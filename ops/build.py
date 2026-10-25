#!/usr/bin/env python3
"""Generate the indexable pages, readiness badges and sitemap from app.js + data/github-stats.json.

  python3 ops/build.py                         write badges/, projects/, sitemap.xml, robots.txt
  python3 ops/build.py --changed-urls FILE     also list the URLs whose page changed (for IndexNow)
  python3 ops/build.py --check                 verify the committed output matches a fresh build

The interactive pages (index.html, lanes.html, project.html?id=…) stay as they are. This adds
one static, crawlable page per catalog entry under projects/, a ranked hub at projects/, an SVG
badge per GitHub repo under badges/, and the sitemap. Output is deterministic: unchanged data
gives byte-identical files, so a quiet night commits nothing.
"""
from __future__ import annotations

import argparse
import html
import json
import os
import sys
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parent))
import catalog  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
STATS = ROOT / "data" / "github-stats.json"
BASE = (os.environ.get("ORN_BASE_URL") or "https://theguysaccount.github.io/open-robotics-nexus/").rstrip("/") + "/"
REPO = "https://github.com/theguysaccount/open-robotics-nexus"
ARTIFACTS = ("code", "cad", "bom", "docs", "firmware", "sim", "license")
LABELS = {"code": "Code", "cad": "CAD", "bom": "BOM", "docs": "Docs", "firmware": "Firmware", "sim": "Sim", "license": "License"}
COLORS = {7: "#44cc11", 6: "#97ca00", 5: "#97ca00", 4: "#dfb317", 3: "#dfb317", 2: "#fe7d37", 1: "#fe7d37", 0: "#e05d44"}
E = lambda v: html.escape(str(v), quote=True)  # noqa: E731


# ---------------------------------------------------------------- badges

def text_width(text: str) -> float:
    """Approximate Verdana 11px advance widths, close enough for badge layout."""
    w = 0.0
    for ch in text:
        if ch in "ijl.,:;!|'":
            w += 3.2
        elif ch in "frtI ":
            w += 4.3
        elif ch in "mwMW":
            w += 9.5
        elif ch.isupper() or ch.isdigit() or ch == "/":
            w += 7.2
        else:
            w += 6.5
    return w


def badge_svg(label: str, message: str, color: str) -> str:
    lw, mw = round(text_width(label) + 12), round(text_width(message) + 12)
    w = lw + mw
    t = f"{E(label)}: {E(message)}"
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="20" role="img" aria-label="{t}"><title>{t}</title>'
            '<linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/>'
            '<stop offset="1" stop-opacity=".1"/></linearGradient>'
            f'<clipPath id="r"><rect width="{w}" height="20" rx="3" fill="#fff"/></clipPath>'
            f'<g clip-path="url(#r)"><rect width="{lw}" height="20" fill="#555"/>'
            f'<rect x="{lw}" width="{mw}" height="20" fill="{color}"/><rect width="{w}" height="20" fill="url(#s)"/></g>'
            '<g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11">'
            f'<text x="{lw / 2:.1f}" y="15" fill="#010101" fill-opacity=".3">{E(label)}</text>'
            f'<text x="{lw / 2:.1f}" y="14">{E(label)}</text>'
            f'<text x="{lw + mw / 2:.1f}" y="15" fill="#010101" fill-opacity=".3">{E(message)}</text>'
            f'<text x="{lw + mw / 2:.1f}" y="14">{E(message)}</text></g></svg>\n')


def badge_for(stats: dict | None) -> str:
    if not stats or "openness" not in stats:
        return badge_svg("open readiness", "unknown", "#9f9f9f")
    if stats.get("stale_since"):
        return badge_svg("open readiness", f"{stats['openness']}/7 (stale)", "#9f9f9f")
    return badge_svg("open readiness", f"{stats['openness']}/7", COLORS[stats["openness"]])


# ---------------------------------------------------------------- pages

def day(stamp: str | None) -> str:
    return (stamp or "")[:10]


def sidebar(prefix: str) -> str:
    return f"""<aside class="sidebar" aria-label="Research sections">
        <a class="brand" href="{prefix}index.html#top" aria-label="Open Robotics Nexus home">
          <span class="brand-mark">ORN</span>
          <span><strong>Open Robotics</strong><em>Nexus</em></span>
        </a>
        <nav class="nav-list">
          <a href="{prefix}index.html#catalog" class="nav-link">Catalog</a>
          <a href="{prefix}projects/" class="nav-link">Readiness ranking</a>
          <a href="{prefix}lanes.html" class="nav-link">Research Lanes</a>
          <a href="{prefix}index.html#benchmark" class="nav-link">Benchmarks</a>
          <a href="{prefix}agents.html" class="nav-link">Research Agents</a>
        </nav>
        <div class="sidebar-panel">
          <span class="panel-label">Refreshed nightly</span>
          <strong>Evidence from the repo</strong>
          <p>Stars, commits, releases and open artifacts are re-read from GitHub every night.</p>
        </div>
      </aside>"""


EXTRA_CSS = """<style>
.live-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0 6px}
.live-grid div{background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:10px 12px}
.live-grid span{display:block;color:var(--muted);font-size:.78rem}.live-grid strong{font-size:1.05rem}
.found-list{list-style:none;padding:0;margin:10px 0;display:grid;gap:6px}
.found-list li{font-size:.9rem}.found-list code{font-size:.8rem;word-break:break-all}
.embed pre{background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:10px;overflow-x:auto;font-size:.8rem;white-space:pre-wrap;word-break:break-all}
.note{color:var(--muted);font-size:.85rem}
.rank-table{width:100%;border-collapse:collapse;font-size:.9rem;background:var(--panel)}
.rank-table th,.rank-table td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
.rank-table th{font-size:.78rem;color:var(--muted);font-weight:600}
.table-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:10px}
</style>"""


def head(title: str, description: str, url: str, prefix: str, image: str = "", ld: list | None = None) -> str:
    tags = [f"<title>{E(title)}</title>", f'<meta name="description" content="{E(description)}" />',
            f'<link rel="canonical" href="{E(url)}" />', '<meta property="og:type" content="article" />',
            '<meta property="og:site_name" content="Open Robotics Nexus" />', f'<meta property="og:title" content="{E(title)}" />',
            f'<meta property="og:description" content="{E(description)}" />', f'<meta property="og:url" content="{E(url)}" />',
            f'<meta name="twitter:card" content="{"summary_large_image" if image else "summary"}" />']
    if image:
        tags.append(f'<meta property="og:image" content="{E(image)}" />')
    for block in ld or []:
        data = json.dumps(block, ensure_ascii=False).replace("<", "\\u003c").replace(">", "\\u003e").replace("&", "\\u0026")
        tags.append(f'<script type="application/ld+json">{data}</script>')
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {chr(10).join("    " + t if i else t for i, t in enumerate(tags))}
    <link rel="icon" href="{prefix}favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="{prefix}styles.css" />
    {EXTRA_CSS}
  </head>"""


def found_list(st: dict) -> str:
    repo, branch = st["repo"], st.get("default_branch", "main")
    rows = []
    for a in ARTIFACTS:
        info = st["artifacts"][a]
        if info["found"]:
            ex = ", ".join(
                f'<a href="https://github.com/{E(repo)}/{"tree" if p.endswith("/") else "blob"}/{E(quote(branch))}/{E(quote(p.rstrip("/")))}"><code>{E(p)}</code></a>'
                for p in info["examples"])
            more = f" and {info['count'] - len(info['examples'])} more" if info["count"] > len(info["examples"]) else ""
            rows.append(f"<li><strong>{LABELS[a]}:</strong> {ex or 'declared license'}{more}</li>")
        else:
            rows.append(f"<li><strong>{LABELS[a]}:</strong> <span class=\"note\">not found in the repository</span></li>")
    return '<ul class="found-list">' + "".join(rows) + "</ul>"


def project_page(p: dict, st: dict | None, siblings: list[dict], lanes: dict) -> str:
    url = f"{BASE}projects/{p['id']}.html"
    has_stats = bool(st and "openness" in st)
    found = [LABELS[a] for a in ARTIFACTS if has_stats and st["artifacts"][a]["found"]]
    if has_stats:
        title = f"{p['name']}: open readiness {st['openness']}/7 · Open Robotics Nexus"
        desc = (f"{p['summary']} Found in the repo: {', '.join(found) or 'no open artifacts'} ({st['openness']} of 7). "
                f"{st['stars']:,} GitHub stars; last commit {day(st.get('last_commit_at')) or 'unknown'}.")
    else:
        title = f"{p['name']} · Open Robotics Nexus"
        desc = f"{p['summary']} Lane: {p['lane']}. Maturity: {p['maturity']}."
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Open Robotics Nexus", "item": BASE},
        {"@type": "ListItem", "position": 2, "name": "Readiness ranking", "item": f"{BASE}projects/"},
        {"@type": "ListItem", "position": 3, "name": p["name"], "item": url}]}
    work = {"@context": "https://schema.org", "@type": "SoftwareSourceCode" if has_stats else "CreativeWork",
            "name": p["name"], "description": p["summary"], "url": url, "keywords": ", ".join(p["tags"])}
    if has_stats:
        work.update({"codeRepository": st["url"], "dateModified": st.get("last_commit_at") or st.get("pushed_at")})
        if st.get("license") and st["license"] != "NOASSERTION":
            work["license"] = f"https://spdx.org/licenses/{st['license']}.html"
    curated = "".join(f'<span class="artifact {"on" if p["artifacts"].get(k) else ""}">{LABELS[k]}</span>' for k in ARTIFACTS)

    live = ""
    if has_stats:
        rel = st.get("latest_release")
        commits = f"{st['commits_90d']}{'+' if st.get('commits_90d_capped') else ''}"
        cells = [("GitHub stars", f"{st['stars']:,}"), ("Forks", f"{st['forks']:,}"), ("Open issues", f"{st['open_issues']:,}"),
                 ("Last commit", day(st.get("last_commit_at")) or "unknown"), ("Commits, last 90 days", commits),
                 ("Latest release", f"{rel['tag']} ({day(rel['published_at'])})" if rel else "none published"),
                 ("License", st.get("license") or "none declared")]
        if st.get("archived"):
            cells.append(("Status", "archived by its maintainers"))
        stale = (f'<p class="note">The last refresh could not read this repository ({E(st.get("error", ""))}); '
                 f'these figures are from {day(st.get("checked_at"))}.</p>') if st.get("stale_since") else ""
        subs = (f'<p class="note">This repository links {len(st["submodules"])} submodule(s) '
                f'({", ".join(E(s) for s in st["submodules"][:4])}); their contents are not counted.</p>') if st.get("submodules") else ""
        md = f"[![Open readiness]({BASE}badges/{p['id']}.svg)]({url})"
        htm = f'<a href="{url}"><img src="{BASE}badges/{p["id"]}.svg" alt="Open readiness"></a>'
        live = f"""
        <h2>Live GitHub signals</h2>
        <p class="note">From <a href="{E(st['url'])}">{E(st['repo'])}</a>, read {E(day(st['checked_at']))}.</p>
        <div class="live-grid">{''.join(f'<div><span>{E(k)}</span><strong>{E(v)}</strong></div>' for k, v in cells)}</div>
        {stale}
        <h2>Open artifacts found in the repository: {st['openness']} of 7</h2>
        {found_list(st)}
        {subs}
        <p class="note">Found by matching the repository's file tree against published rules (see the
        <a href="./#method">method</a>). Files hosted elsewhere (Onshape, a docs site, a separate repo) aren't counted.
        Think a result is wrong? <a href="{REPO}/issues">Open an issue</a>.</p>
        <section class="embed">
          <h2>Readiness badge</h2>
          <p><img src="../badges/{E(p['id'])}.svg" alt="Open readiness {st['openness']}/7" /></p>
          <p class="note">Maintainers can show it in a README. It updates every night, so adding a BOM, CAD files or a docs folder raises it.</p>
          <pre><code>{E(md)}</code></pre>
          <pre><code>{E(htm)}</code></pre>
        </section>"""

    related = "".join(f'<li><a href="{E(s["id"])}.html">{E(s["name"])}</a></li>' for s in siblings)
    evidence = "".join(f'<li><a href="{E(h)}" rel="noopener">{E(label)}</a></li>' for label, h in p["evidence"])
    return f"""{head(title, desc, url, "../", p.get("image", ""), [work, crumbs])}
  <body data-page="static-project">
    <div class="app-shell">
      {sidebar("../")}
      <main class="workspace">
        <header class="page-header">
          <a class="back-link" href="./">&larr; Readiness ranking</a>
          <p class="eyebrow">{E(p['lane'])} / {E(p['kind'])} / {E(p['status'])}</p>
          <h1>{E(p['name'])}</h1>
          <p>{E(p['summary'])}</p>
          <div class="detail-actions">
            <a class="solid-button" href="{E(p['url'])}" rel="noopener">Open source page</a>
            <a class="ghost-button" href="../project.html?id={E(p['id'])}">Interactive view</a>
          </div>
        </header>
        <section class="project-page-layout">
          <div class="project-main-panel">
            {live}
            <h2>Curated review</h2>
            <p>{E(p['notes'])}</p>
            <div class="artifact-row large">{curated}</div>
            <h2>Evidence</h2>
            <ul class="evidence-list">{evidence}</ul>
          </div>
          <aside class="project-side-panel">
            <div class="detail-meta stacked">
              <div><span>Lane</span><strong><a href="../lane.html?lane={E(quote(p['lane']))}">{E(p['lane'])}</a></strong></div>
              <div><span>Maturity</span><strong>{E(p['maturity'])}</strong></div>
              <div><span>Maintainer</span><strong>{E(p['maintainer'])}</strong></div>
              <div><span>Cost</span><strong>{E(p['cost'])}</strong></div>
            </div>
            <div class="score-row stacked">
              {''.join(f'<div class="score-mini"><span><b>{k}</b><b>{v}</b></span><div class="bar"><i style="width: {v}%"></i></div></div>' for k, v in (("Open readiness (curated)", p['signals']['readiness']), ("Shipping velocity", p['signals']['velocity']), ("Home robot fit", p['signals']['homeFit'])))}
            </div>
            <div class="tag-row spaced">{''.join(f'<span class="tag">{E(t)}</span>' for t in p['tags'])}</div>
            <p class="note">{E(lanes.get(p['lane'], ''))}</p>
            <h2>More in {E(p['lane'])}</h2>
            <ul class="evidence-list">{related or '<li>No other entries yet.</li>'}</ul>
          </aside>
        </section>
        <p class="note">Scores are automated and curated research signals, not endorsements or safety certifications.
        Build and operate robots at your own risk. Source: <a href="{REPO}">{REPO.split('//', 1)[1]}</a>.</p>
      </main>
    </div>
  </body>
</html>
"""


def hub_page(projects: list[dict], stats: dict, generated: str) -> str:
    def key(p):
        st = stats.get(p["id"]) or {}
        return (-(st.get("openness", -1)), -(st.get("stars", 0)), p["name"].lower())

    rows = []
    for p in sorted(projects, key=key):
        st = stats.get(p["id"])
        if st and "openness" in st:
            score = f'<img src="../badges/{E(p["id"])}.svg" alt="{st["openness"]}/7" />'
            found = ", ".join(LABELS[a] for a in ARTIFACTS if st["artifacts"][a]["found"]) or "none"
            stars, last = f"{st['stars']:,}", day(st.get("last_commit_at"))
            rel = st.get("latest_release")
            rel = f"{E(rel['tag'])}<br><span class=\"note\">{day(rel['published_at'])}</span>" if rel else "none"
        else:
            score, found, stars, last, rel = "not on GitHub", "", "", "", ""
        rows.append(f'<tr><td><a href="{E(p["id"])}.html"><strong>{E(p["name"])}</strong></a><br><span class="note">{E(p["kind"])}</span></td>'
                    f'<td>{E(p["lane"])}</td><td>{score}</td><td>{E(found)}</td><td>{stars}</td><td>{last}</td><td>{rel}</td>'
                    f'<td>{p["signals"]["homeFit"]}</td></tr>')
    title = "Open-source robotics projects ranked by open readiness · Open Robotics Nexus"
    desc = (f"{len(projects)} open-source humanoids, arms, hands, mobile bases and robot-learning stacks, ranked by which "
            "open artifacts (code, CAD, BOM, docs, firmware, simulation, license) their repositories actually contain. "
            "Refreshed nightly from GitHub.")
    ld = {"@context": "https://schema.org", "@type": "ItemList", "name": "Open-source robotics projects by open readiness",
          "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": f"{BASE}projects/{p['id']}.html", "name": p["name"]}
                              for i, p in enumerate(sorted(projects, key=key))]}
    rules = "".join(f"<li><strong>{LABELS[a]}</strong>: {E(text)}</li>" for a, text in (
        ("code", "source files (.py, .cpp, .c, .rs, .js, .ts, .go, .ipynb and similar)"),
        ("cad", "mechanical files (.step, .stp, .stl, .3mf, .f3d, .fcstd, .sldprt, .iges, .scad, .dxf…) or a cad/ or stl/ folder"),
        ("bom", "a file or folder named BOM, bill of materials or parts list"),
        ("docs", "a docs/ or documentation folder, or a docs-site config (mkdocs.yml, docusaurus, Sphinx conf.py)"),
        ("firmware", "a firmware/, arduino/, esp32/ or similar folder, .ino files, or platformio.ini"),
        ("sim", "robot descriptions (.urdf, .xacro, .mjcf, .sdf, .usd) or simulator code (MuJoCo, Isaac, Gazebo, PyBullet)"),
        ("license", "a LICENSE or COPYING file, or a license GitHub recognises")))
    return f"""{head(title, desc, BASE + "projects/", "../", "", [ld])}
  <body data-page="static-ranking">
    <div class="app-shell">
      {sidebar("../")}
      <main class="workspace">
        <header class="page-header">
          <p class="eyebrow">Readiness ranking</p>
          <h1>Open-source robotics projects, ranked by what they actually publish</h1>
          <p>{E(desc)}</p>
        </header>
        <section class="dashboard-section">
          <div class="table-wrap">
            <table class="rank-table">
              <thead><tr><th>Project</th><th>Lane</th><th>Open readiness</th><th>Found in the repo</th><th>Stars</th><th>Last commit</th><th>Latest release</th><th>Home fit</th></tr></thead>
              <tbody>{''.join(rows)}</tbody>
            </table>
          </div>
          <p class="note">GitHub data read {E(day(generated))}. Home fit is a curated 0–100 judgement of usefulness for a low-cost home robot.</p>
        </section>
        <section class="dashboard-section" id="method">
          <h2>Method</h2>
          <p>Every night a GitHub Actions job reads each repository's metadata, latest release, commits from the last 90 days
          and full file tree through the GitHub REST API. An artifact counts as present when the file tree matches its rule:</p>
          <ul>{rules}</ul>
          <p class="note">Only what is inside the repository counts: CAD on Onshape, docs on a separate site and code in
          submodules or other repositories don't. The curated scores on each page are a separate human review. To dispute
          a result or add a project, <a href="{REPO}/issues">open an issue</a>.</p>
        </section>
      </main>
    </div>
  </body>
</html>
"""


def sitemap(projects: list[dict], stats: dict, generated: str) -> str:
    urls = [(BASE, ""), (BASE + "lanes.html", ""), (BASE + "agents.html", ""), (BASE + "projects/", day(generated))]
    urls += [(f"{BASE}projects/{p['id']}.html", day((stats.get(p["id"]) or {}).get("checked_at"))) for p in projects]
    rows = "".join(f"<url><loc>{E(u)}</loc>{f'<lastmod>{m}</lastmod>' if m else ''}</url>\n" for u, m in urls)
    return f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{rows}</urlset>\n'


def robots() -> str:
    return ("# Crawlers only read robots.txt at the host root (https://theguysaccount.github.io/robots.txt),\n"
            "# which is generated from this file's Sitemap line. Kept here so the sitemap is easy to find.\n"
            f"User-agent: *\nAllow: /\n\nSitemap: {BASE}sitemap.xml\n")


# ---------------------------------------------------------------- main

def render() -> dict[Path, str]:
    projects, lanes = catalog.load()
    data = json.loads(STATS.read_text(encoding="utf-8")) if STATS.exists() else {"projects": {}, "generated_at": ""}
    stats, generated = data["projects"], data.get("generated_at", "")
    files = {}
    for p in projects:
        siblings = sorted((s for s in projects if s["lane"] == p["lane"] and s["id"] != p["id"]),
                          key=lambda s: -s["signals"]["homeFit"])[:6]
        files[ROOT / "projects" / f"{p['id']}.html"] = project_page(p, stats.get(p["id"]), siblings, lanes)
        if catalog.github_repo(p["url"]):
            files[ROOT / "badges" / f"{p['id']}.svg"] = badge_for(stats.get(p["id"]))
    files[ROOT / "projects" / "index.html"] = hub_page(projects, stats, generated)
    files[ROOT / "sitemap.xml"] = sitemap(projects, stats, generated)
    files[ROOT / "robots.txt"] = robots()
    return files


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="Generate pages, badges and the sitemap.")
    ap.add_argument("--check", action="store_true", help="exit 1 if the committed output differs from a fresh build")
    ap.add_argument("--changed-urls", type=Path, help="write the URLs of pages that changed to this file")
    args = ap.parse_args(argv)
    files = render()
    stale = [p for p, text in files.items() if not p.exists() or p.read_text(encoding="utf-8") != text]
    if args.check:
        for p in stale:
            print(f"out of date: {p.relative_to(ROOT)}")
        return 1 if stale else 0
    for p in stale:
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(files[p], encoding="utf-8")
    urls = [BASE + str(p.relative_to(ROOT)).replace("index.html", "") for p in stale if p.suffix == ".html"]
    if args.changed_urls:
        args.changed_urls.write_text("".join(u + "\n" for u in urls), encoding="utf-8")
    print(f"{len(files)} files generated; {len(stale)} changed ({len(urls)} pages).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
