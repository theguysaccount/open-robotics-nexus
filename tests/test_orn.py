"""Offline tests: the app.js catalog parser, artifact detection, generated pages, badges and sitemap.
Run: python3 -m unittest discover -s tests"""
import json
import re
import sys
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "ops"))
import build  # noqa: E402
import catalog  # noqa: E402
import refresh  # noqa: E402


class Catalog(unittest.TestCase):
    def test_parses_every_entry(self):
        projects, lanes = catalog.load()
        self.assertGreaterEqual(len(projects), 30)
        self.assertEqual(len({p["id"] for p in projects}), len(projects))
        for p in projects:
            for key in ("id", "name", "lane", "kind", "url", "summary", "artifacts", "signals", "evidence", "tags"):
                self.assertIn(key, p, p.get("id"))
            self.assertIn(p["lane"], lanes)

    def test_js_literal_edge_cases(self):
        src = """[{ id: "a", cost: "Source claim: sub-$5,000", quote: 'it\\'s', nested: { ok: true, n: 3, }, list: [["x", "https://a.b/c?d=1"],], }]"""
        data = json.loads(catalog.js_literal_to_json(src))
        self.assertEqual(data[0]["cost"], "Source claim: sub-$5,000")
        self.assertEqual(data[0]["quote"], "it's")
        self.assertEqual(data[0]["nested"], {"ok": True, "n": 3})
        self.assertEqual(data[0]["list"], [["x", "https://a.b/c?d=1"]])

    def test_github_repo(self):
        self.assertEqual(catalog.github_repo("https://github.com/huggingface/lerobot"), "huggingface/lerobot")
        self.assertEqual(catalog.github_repo("https://github.com/a/b.git"), "a/b")
        self.assertIsNone(catalog.github_repo("https://github.com/topics/robotics"))
        self.assertIsNone(catalog.github_repo("https://hackaday.io/projects?tag=robot"))


class Detection(unittest.TestCase):
    def found(self, paths):
        return {a for a, v in refresh.detect(paths).items() if v["found"]}

    def test_rules(self):
        self.assertEqual(self.found(["cad/arm.STEP", "hardware/BOM.csv", "firmware/main.ino", "urdf/arm.urdf",
                                     "docs/index.md", "LICENSE", "src/main.cpp"]), set(refresh.ARTIFACTS))
        self.assertEqual(self.found(["README.md", "tests/test_bombardier.py"]), {"code"})
        self.assertEqual(self.found(["Simulation/scene_mujoco.xml", "parts/Bill_of_Materials.xlsx"]), {"sim", "bom"})

    def test_submodule_names_count_as_folders(self):
        self.assertEqual(self.found(["firmware/"]), {"firmware"})


class Generated(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files = build.render()

    def test_deterministic(self):
        self.assertEqual(self.files, build.render())

    def test_committed_output_is_current(self):
        stale = [str(p.relative_to(ROOT)) for p, text in self.files.items()
                 if not p.exists() or p.read_text(encoding="utf-8") != text]
        self.assertEqual(stale, [], "run: python3 ops/build.py")

    def test_badges_are_svg(self):
        badges = [p for p in self.files if p.suffix == ".svg"]
        self.assertTrue(badges)
        for p in badges:
            root = ET.fromstring(self.files[p])
            self.assertTrue(root.tag.endswith("svg"))
            self.assertRegex(root.get("aria-label"), r"^open readiness: (\d/7|unknown)")

    def test_project_pages(self):
        projects, _ = catalog.load()
        for p in projects:
            page = self.files[ROOT / "projects" / f"{p['id']}.html"]
            with self.subTest(id=p["id"]):
                self.assertIn(f'<link rel="canonical" href="{build.BASE}projects/{p["id"]}.html" />', page)
                self.assertEqual(len(re.findall(r"<h1[\s>]", page)), 1)
                self.assertRegex(page, r'<meta name="description" content="[^"]{60,}" />')
                for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page):
                    json.loads(block)
                self.assertNotIn("<script src=", page)  # static pages work without JavaScript

    def test_sitemap_urls_resolve_to_files(self):
        root = ET.fromstring(self.files[ROOT / "sitemap.xml"])
        locs = [el.text for el in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")]
        self.assertGreaterEqual(len(locs), 40)
        for url in locs:
            self.assertTrue(url.startswith(build.BASE), url)
            rel = url[len(build.BASE):]
            path = ROOT / (rel + "index.html" if rel.endswith("/") or not rel else rel)
            self.assertTrue(path in self.files or path.exists(), url)

    def test_robots_points_at_sitemap(self):
        self.assertIn(f"Sitemap: {build.BASE}sitemap.xml", self.files[ROOT / "robots.txt"])


class Plumbing(unittest.TestCase):
    def test_indexnow_key(self):
        keys = [p for p in ROOT.glob("*.txt") if re.fullmatch(r"[0-9a-f]{32}", p.stem)]
        self.assertEqual(len(keys), 1)
        self.assertEqual(keys[0].read_text().strip(), keys[0].stem)
        for wf in ("refresh.yml", "checks.yml"):
            self.assertIn(keys[0].name, (ROOT / ".github/workflows" / wf).read_text())

    def test_existing_pages_keep_their_navigation(self):
        for name in ("index.html", "lanes.html", "lane.html", "project.html", "agents.html", "ai.html"):
            html = (ROOT / name).read_text()
            for nav in ('data-nav="home"', 'data-nav="lanes"', 'data-nav="ai"', 'data-nav="agents"', 'data-nav="ranking"'):
                self.assertIn(nav, html, name)


if __name__ == "__main__":
    unittest.main()
