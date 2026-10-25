# Open Robotics Nexus

A static dashboard/hub for organizing open source robotics projects, resources, benchmarks, future discovery agents, and a prototype community AI.

Open locally:

```bash
open index.html
```

Pages:

- `index.html`: catalog dashboard and benchmark overview
- `lanes.html`: clickable research lane index
- `lane.html?lane=Arms`: filtered lane detail pages
- `project.html?id=parol6`: internal project evidence pages
- `agents.html`: backend scheduled-agent plan
- `ai.html`: local catalog-aware community AI prototype

This version is intentionally static and seeded from the research brief in `open_source_robotics_hub.md`. The next step is to move the catalog data into a JSON/API layer and have scheduled research agents append candidates into a human review queue.

## Live site and automation

Live at **https://theguysaccount.github.io/open-robotics-nexus/** (GitHub Pages, deployed from `main`).

The catalog in `app.js` stays the single source of truth. A nightly GitHub Actions job adds what the
interactive pages can't do on their own:

- `data/github-stats.json`: stars, forks, open issues, license, last commit, commits in the last 90 days
  and the latest release for every catalog entry on GitHub, plus which of seven open artifacts (code, CAD,
  BOM, docs, firmware, simulation, license) its repository actually contains.
- `projects/`: a crawlable page per catalog entry with those live signals and the curated review, and a
  ranking of every project by open readiness, with the method.
- `badges/<id>.svg`: an embeddable "open readiness N/7" badge per GitHub repo that maintainers can put in
  their README. It updates every night.
- `sitemap.xml`, and the IndexNow key file pinged after every deploy.

```bash
python3 -m http.server 8000                         # then open http://localhost:8000
GITHUB_TOKEN=... python3 ops/refresh.py             # refresh GitHub signals (about 90 seconds)
python3 ops/build.py                                # regenerate projects/, badges/, sitemap.xml
python3 -m unittest discover -s tests               # tests
python3 ops/health.py                               # check the live site
```

Scheduled jobs, how they fail safely and what to watch: [OPERATIONS.md](OPERATIONS.md).
