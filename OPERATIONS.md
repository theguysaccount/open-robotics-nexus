# Operations

Open Robotics Nexus runs unattended on GitHub Pages at
https://theguysaccount.github.io/open-robotics-nexus/ (branch deploy from `main`, no build step).
This file covers every automated job, how it fails safely, what to watch, and the keys a human can
turn later.

## Automated jobs

| Workflow | When | What it does | How it fails safely |
|---|---|---|---|
| **Refresh** (`refresh.yml`) | Nightly 03:47 UTC | `ops/refresh.py` reads every catalog repo through the GitHub API (stars, forks, issues, license, last commit, 90-day commits, latest release, full file tree) and scores openness from the tree. `ops/build.py` regenerates `projects/`, `badges/` and `sitemap.xml`; the tests run; the result is committed. It then waits for the Pages build (requesting one if the bot's push didn't start it), checks the live site and pings IndexNow with the pages that changed | A repo that can't be read keeps its last good entry, marked stale on its page and badge. If more than half fail (rate limit, API outage) nothing is written. If the tests fail nothing is committed. Either way the last good deploy stays live. |
| **Checks** (`checks.yml`) | Every push and pull request | `node --check app.js` and the unit tests: the app.js catalog parser, artifact rules, and that the committed pages, badges and sitemap match a fresh build. After a push to `main` it waits for the Pages build, checks the live site and pings IndexNow with the sitemap | Pages deploys whatever reaches `main`, so **merge only green pull requests**. A red check on `main` means a bad commit is live. |
| **Health** (`health.yml`) | Daily 06:41 UTC | `ops/health.py`: the interactive pages and assets, every sitemap URL, the nightly data's age (warn over 30 hours, fail over 72), badges, the IndexNow key file, the host-root `robots.txt`, and the icon CDN | Read-only. Fails loudly with `::error::` annotations. |
| **Health → keepalive** | Daily, same workflow | Commits `.github/keepalive` after 30 days without a commit and re-enables workflows GitHub disabled for inactivity | The nightly refresh usually commits anyway; the heartbeat covers quiet stretches so GitHub never disables the schedules after 60 days. |

## What to watch

- **Actions tab.** A red **Refresh** means tonight's data didn't ship (the run's annotations name the repos or
  test that failed). A red **Health** means the live site is broken or the data is over 72 hours old.
- **Stale entries.** A renamed or deleted catalog repo shows as stale (grey badge) until its `url` in `app.js`
  is fixed. Renames are followed automatically.
- **Icon CDN.** The interactive pages load `lucide@latest` from unpkg. If a release breaks it, icons vanish but
  the pages work; Health warns when the CDN stops answering.
- **Failure emails** for scheduled runs go to the account owner. Nothing else alerts.

## Adding or changing a project

Edit the `projects` array in `app.js`, then run `python3 ops/build.py` (and `GITHUB_TOKEN=… python3 ops/refresh.py
--only <id>` for its live signals) and open a pull request. Checks fails if the generated pages are out of date.
The nightly refresh regenerates everything anyway.

## Keys a human can turn later

None of these is needed for the site to keep running.

1. **Custom domain.** The venture plan's production domain is `roboticshouse.org`. This is a DNS change for the
   owner: point the domain at GitHub Pages (apex A records 185.199.108.153, 185.199.109.153, 185.199.110.153,
   185.199.111.153; `www` CNAME to `theguysaccount.github.io`), add it under Settings → Pages → Custom domain,
   then set the repository variable `ORN_BASE_URL` to `https://roboticshouse.org/` and pass it to the build and
   health steps (`env: ORN_BASE_URL: ${{ vars.ORN_BASE_URL }}`) so canonical URLs, badges and the sitemap move too.
2. **Money: a component-vendor sponsor slot.** Pages is for non-commercial sites, so a sponsor is a plain link,
   not checkout. Add one line under the sidebar panel in `ops/build.py`'s `sidebar()` (and the six interactive
   pages) such as `<a href="SPONSOR-URL" rel="sponsored">Sponsor: NAME</a>`, run `python3 ops/build.py`, and open
   a pull request.
3. **Search Console.** Verify `https://theguysaccount.github.io/open-robotics-nexus/` with Google's HTML-file
   method (add the file at the repo root) and submit `sitemap.xml`. Bing and others already get IndexNow pings,
   and the host-root `robots.txt` lists this sitemap.

## Scheduled Claude routine (for later)

Curation and writing can't run inside Actions (no model API key). When a Claude scheduled task is available,
run this weekly in a clone of this repo:

> Read `data/github-stats.json` and `projects/index.html`. Review the five highest-starred open-source robotics
> repositories in each lane that are not yet in the `projects` array of `app.js` (search GitHub topics such as
> `open-source-hardware`, `robot-arm`, `humanoid`, `quadruped`), and add at most three that publish real hardware
> artifacts, with curated summary, artifacts, signals and evidence links. Fix the `url` of any entry marked stale.
> Run `python3 ops/build.py` and `python3 -m unittest discover -s tests`, open one pull request, and merge it only
> when Checks is green.
