# Open Source Robotics Hub

Captured from the June 29, 2026 conversation. This is a queued product/research initiative, not an active build.

## 1) Thesis

Open source robotics is fragmented across GitHub lists, Reddit threads, research papers, Discords, YouTube demos, manufacturer pages, and one-off project repos. The opportunity is to create the central hub for following, comparing, and accelerating open source robotics, especially low-cost home robots, humanoids, mobile manipulators, robot arms, hands, and stair-capable mobility platforms.

The wedge is not "another list." The wedge is a living research dashboard that tells builders which projects matter, how open they really are, how reproducible they are, what gaps remain, and which benchmark targets would make the work consequential.

## 2) Core Product

Build a public web hub that combines:

- A catalog of open source robotics projects.
- A better taxonomy than existing lists.
- Project pages with source links, build status, BOM/CAD/code/license evidence, and recent activity.
- A "shipping velocity" view showing which teams are actively improving.
- Benchmarks and challenge targets, similar in spirit to an X Prize for useful low-cost robotics.
- A public update feed for newly discovered or newly improved projects.
- Scheduled research agents that keep discovering, verifying, deduplicating, and classifying new projects.

## 3) Audience

- Robotics builders who want reusable parts, subsystems, and reference designs.
- Students and researchers who need consequential project targets.
- Open source maintainers who want visibility and collaborators.
- Investors and operators tracking the low-cost robotics frontier.
- Internal engineering and manufacturing teams looking for parts, designs, or collaborators.

## 4) Better Categorization

Most existing lists group projects by broad robot type or library category. This hub should classify each project across multiple useful axes.

### Robot or Subsystem Type

- Full robot platform
- Humanoid
- Mobile manipulator
- Wheeled base
- Stair-climbing mobility
- Legged platform
- Robot arm
- Dexterous hand or gripper
- Soft robotics
- Sensors and tactile skins
- Electronics and control boards
- Simulation or robot description
- AI/control stack
- Dataset or benchmark
- Manufacturing, BOM, and supply chain resource

### Use Case

- Low-cost home robot
- Research platform
- Education
- Industrial automation
- Teleoperation
- Manipulation
- Locomotion
- Household navigation
- Robotic vacuum or appliance
- Humanoid learning

### Openness Completeness

Track the actual artifacts, not just the word "open."

- Software source available
- Firmware source available
- CAD/mechanical files available
- Electrical schematics available
- BOM with supplier links available
- Assembly docs available
- Calibration docs available
- Simulation model available
- Dataset or training assets available
- Clear hardware license
- Clear software license
- Reproducible third-party build evidence

### Buildability

- Estimated BOM cost
- Assembly time
- Required tools
- Required manufacturing process
- Parts availability
- Safety complexity
- Documentation quality
- Community support
- Known build failures or missing files

### Maturity

- Concept
- Paper-only
- Prototype
- Buildable
- Reproduced by others
- Active community
- Kit or prebuilt option
- Productionized
- Dormant or abandoned

### Strategic Fit

Score how relevant a project is to the low-cost useful home robot goal:

- Cost leverage
- Mobility relevance
- Stair relevance
- Manipulation relevance
- Modularity
- Compatibility with other open projects
- Active shipping velocity
- Potential collaborator quality
- Evidence quality

## 5) Scoring Model

Use scores to make the hub more useful than a link dump.

### Open Source Readiness Score

0 to 5 for each:

- CAD/mechanical completeness
- Electronics/BOM completeness
- Software/firmware completeness
- License clarity
- Assembly documentation
- Simulation assets
- Build reproducibility
- Maintainer activity

### Shipping Velocity Score

Signals:

- Commits/releases in the last 30, 90, and 180 days
- Issue and PR response time
- New demos or videos
- New papers, docs, BOM revisions, or release assets
- Community mentions from credible builders

### Home Robot Fit Score

Signals:

- Can move in a home environment
- Can handle stairs or offers a credible stair-capable subsystem
- Has manipulation components usable in a domestic setting
- BOM can plausibly reach sub-$5,000 for a useful prototype
- Parts are purchasable without custom industrial procurement
- Safety and reliability are documented

## 6) Draft Benchmark Target

Create an "Open Home Robot Challenge" target so researchers and open source builders know what consequential progress looks like.

Early draft target:

- Total BOM under $5,000 for a buildable prototype.
- Can navigate typical home flooring and thresholds.
- Can climb or otherwise traverse a standard household staircase.
- Can operate for at least 60 minutes.
- Can carry or manipulate household objects in the 0.5 to 2.0 kg range.
- Uses mostly commodity or easily sourced parts.
- Provides source code, firmware, CAD, schematics, BOM, assembly docs, and license files.
- Includes a reproducible benchmark video and telemetry package.

This target should be refined into explicit test protocols before publication.

## 7) Data Model

Initial catalog schema:

```json
{
  "name": "Project name",
  "url": "Primary project URL",
  "repo_url": "GitHub/GitLab/etc.",
  "project_type": ["humanoid", "robot-arm"],
  "use_cases": ["home-robot", "education"],
  "summary": "One-sentence neutral description.",
  "maintainers": ["Organization or individuals"],
  "license_software": "MIT/Apache-2.0/etc.",
  "license_hardware": "CERN-OHL/etc.",
  "artifacts": {
    "software": true,
    "firmware": false,
    "cad": true,
    "schematics": false,
    "bom": true,
    "assembly_docs": true,
    "simulation": false
  },
  "cost_estimate_usd": null,
  "maturity": "buildable",
  "activity": {
    "last_commit": null,
    "last_release": null,
    "recent_demo_url": null
  },
  "scores": {
    "open_source_readiness": null,
    "shipping_velocity": null,
    "home_robot_fit": null
  },
  "sources": [
    {
      "url": "Evidence URL",
      "captured_at": "YYYY-MM-DD",
      "notes": "Why this source supports the entry."
    }
  ],
  "review_status": "candidate"
}
```

## 8) Seed Source Map

These are starting points for the first research crawl. They should be treated as seed sources, not canonical truth.

### General Open Source Robotics Lists

- Awesome Open Source Robots: https://github.com/stephane-caron/awesome-open-source-robots
- Awesome Robotics Projects: https://github.com/mjyc/awesome-robotics-projects
- Awesome Robotics: https://github.com/ahundt/awesome-robotics
- Awesome Weekly Robotics: https://github.com/msadowski/awesome-weekly-robotics
- Open-Source Robotics Hardware Projects, Yale GRAB Lab: https://www.eng.yale.edu/grablab/openrobothardware.html
- Open Source Robotics collection: https://robotics.growbotics.ai
- GitHub robotics topic: https://github.com/topics/robotics

### Arms, Hands, Electronics, and Subsystems

- Awesome Open Source Robotic Arms: https://github.com/adafruit/awesome-open-source-robotic-arms
- Robot Electronics list: https://github.com/cajt/list_of_robot_electronics
- Amazing Hand: https://github.com/pollen-robotics/AmazingHand
- Awesome Vacuum: https://github.com/awesome-vacuum/awesome-vacuum

### Humanoids and Robot Descriptions

- Awesome Humanoid Robot Learning: https://github.com/YanjieZe/awesome-humanoid-robot-learning
- AI Humanoid Robots list: https://github.com/jk4e/list-ai-humanoid-robots
- Awesome Robot Descriptions: https://github.com/robot-descriptions/awesome-robot-descriptions
- Berkeley Humanoid Lite: https://github.com/hybridrobotics/berkeley-humanoid-lite
- Poppy Humanoid: https://github.com/poppy-project/poppy-humanoid
- Asimov v1: https://github.com/asimovinc/asimov-1
- ROBOTO_ORIGIN: https://github.com/Roboparty/roboto_origin

### Mobile Robots and ROS

- Linorobot2: https://github.com/linorobot/linorobot2
- GitHub mobile robot topic: https://github.com/topics/mobile-robot

### AI, Learning, and Simulation

- Awesome LLM Robotics: https://github.com/GT-RIPL/Awesome-LLM-Robotics
- Awesome Robotics Libraries: https://jslee02.github.io/awesome-robotics-libraries/
- Robotics Resources: https://github.com/Tinker-Twins/Robotics-Resources
- Open Robotics: https://www.openrobotics.org/

## 9) Scheduled Agent Design

Do not activate these until the catalog and review workflow exist.

### Agent 1: Discovery Sweep

Cadence: daily.

Job:

- Search GitHub, GitHub topics, Reddit, ROS Discourse, Hacker News, YouTube, arXiv, Google Scholar, Hackaday, OSHWA, robotics newsletters, and robotics blogs.
- Find new open source robotics projects, especially projects with CAD, BOM, simulation files, robot arms, hands, mobile bases, humanoids, or stair-capable mechanisms.
- Output candidates with evidence links and confidence scores.

### Agent 2: Verification and Deduplication

Cadence: every 2 to 3 days.

Job:

- Confirm whether candidates are truly open source.
- Check whether CAD/BOM/code/docs/license files exist.
- Merge duplicates.
- Flag dead links, abandoned projects, or misleading openness claims.

### Agent 3: Classification and Scoring

Cadence: after verification or weekly.

Job:

- Apply the taxonomy.
- Assign readiness, velocity, and home robot fit scores.
- Note missing evidence and follow-up questions.

### Agent 4: Benchmark Watcher

Cadence: weekly.

Job:

- Track benchmark claims, new papers, videos, build reports, and third-party reproductions.
- Extract metrics that could feed the Open Home Robot Challenge.

### Agent 5: Publisher

Cadence: human-approved only.

Job:

- Update the web catalog.
- Draft newsletter snippets.
- Draft X/Twitter posts for newly added projects.

Guardrail: no public post should go out until a human approves the project entry and claim wording.

## 10) X/Twitter Bot Queue

Later, build a bot that posts when a new verified project is added.

Example post format:

```text
Added to the Open Source Robotics Hub:

[Project name]
[One-line neutral description]

Why it matters: [specific subsystem, cost, benchmark, or buildability reason]
Tags: [robot-arm] [humanoid] [BOM] [CAD] [home-robot-fit]

[project page URL]
```

Rules:

- Post only verified projects.
- Avoid exaggerated claims.
- Link to the hub page, not only the external repo.
- Thread only when there is enough evidence to explain why the project matters.
- Keep a human approval queue until trust is earned.

## 11) MVP Plan

### Phase 0: Research Queue

- Finalize taxonomy and scoring.
- Import seed source map.
- Collect first 100 candidate projects.
- Review 25 high-relevance projects by hand.
- Decide the web stack.

### Phase 1: Static Public Hub

- Catalog page with filters and search.
- Project detail pages.
- Source/evidence panel.
- "Recently added" feed.
- "Most active" and "best documented" views.
- Benchmark/challenge page.

### Phase 2: Agent-Assisted Catalog

- Add daily discovery sweep.
- Add candidate review queue.
- Add deduplication and verification.
- Add scoring.
- Add weekly digest output.

### Phase 3: Community and Distribution

- Public submission form.
- Maintainer claim/update flow.
- Newsletter.
- X/Twitter bot with approval.
- Challenge leaderboard.

## 12) Immediate Next Actions

1. Pick a working name for the hub.
2. Decide whether the first public niche is broad open source robotics or specifically low-cost home robotics.
3. Create the first spreadsheet/JSON catalog with the schema above.
4. Run a first research pass over the seed source map.
5. Hand-review the top 25 candidates.
6. Build the static web page once the initial catalog has enough signal.
