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
