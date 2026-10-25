"""Read the seeded catalog out of app.js, the single source of truth for the site.

app.js declares `const projects = [ ... ];` as a JavaScript object literal. This module turns
that literal into JSON with a small tokenizer (quote bare keys, drop trailing commas) instead of
regexes, so colons and commas inside strings can't confuse it.
"""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
APP_JS = ROOT / "app.js"


def js_literal_to_json(src: str) -> str:
    out, i, n = [], 0, len(src)
    while i < n:
        ch = src[i]
        if ch in "\"'":  # string literal: copy through, normalising to double quotes
            j, buf = i + 1, []
            while src[j] != ch:
                if src[j] == "\\":
                    buf.append(src[j:j + 2])
                    j += 2
                    continue
                buf.append('\\"' if src[j] == '"' else src[j])
                j += 1
            out.append('"' + "".join(buf).replace("\\'", "'") + '"')
            i = j + 1
        elif ch == "/" and src[i:i + 2] == "//":  # line comment
            i = src.index("\n", i)
        elif ch == "/" and src[i:i + 2] == "/*":
            i = src.index("*/", i) + 2
        elif ch.isalpha() or ch in "_$":
            m = re.match(r"[A-Za-z_$][A-Za-z0-9_$]*", src[i:])
            word = m.group(0)
            rest = src[i + len(word):].lstrip()
            out.append(f'"{word}"' if rest.startswith(":") and word not in ("true", "false", "null") else word)
            i += len(word)
        elif ch == ",":  # drop trailing commas before ] or }
            if src[i + 1:].lstrip()[:1] in ("]", "}"):
                i += 1
                continue
            out.append(ch)
            i += 1
        else:
            out.append(ch)
            i += 1
    return "".join(out)


def extract(name: str, text: str) -> str:
    """The literal assigned to `const <name> =`, bracket-matched (strings skipped)."""
    m = re.search(rf"const {name}\s*=\s*", text)
    if not m:
        raise ValueError(f"const {name} not found in app.js")
    i = start = m.end()
    opener = text[i]
    closer = {"[": "]", "{": "}"}[opener]
    depth, quote = 0, None
    while True:
        ch = text[i]
        if quote:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                quote = None
        elif ch in "\"'":
            quote = ch
        elif ch == opener:
            depth += 1
        elif ch == closer:
            depth -= 1
            if depth == 0:
                return text[start:i + 1]
        i += 1


def load(path: Path = APP_JS) -> tuple[list[dict], dict]:
    text = path.read_text(encoding="utf-8")
    projects = json.loads(js_literal_to_json(extract("projects", text)))
    lanes = json.loads(js_literal_to_json(extract("laneDescriptions", text)))
    return projects, lanes


def github_repo(url: str) -> str | None:
    """'owner/repo' for a github.com repository URL, else None."""
    m = re.match(r"https?://github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)/?(?:[#?].*)?$", url or "")
    if not m or m.group(1) in ("topics", "orgs", "sponsors", "collections"):
        return None
    return f"{m.group(1)}/{m.group(2).removesuffix('.git')}"
