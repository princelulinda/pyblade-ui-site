"""Build the docs data from the PyBlade UI registry.

Renders every example in docs-src/examples with the real components, then writes:
  content/registry.json        what the docs pages read (sources, examples, rendered HTML, props),
                               and the landing showcase in other languages (docs-src/landing/<lang>/)
  public/preview/preview.css   Tailwind CSS for the previews, with the generated theme
  public/preview/alpine.min.js Alpine.js for the interactive previews

    PYBLADE_UI=../pyblade-ui python scripts/build_docs.py

It needs a Python with `pyblade` installed. The registry is read from $PYBLADE_UI (default ../pyblade-ui).
"""

from __future__ import annotations

import ast
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIB = Path(os.environ.get("PYBLADE_UI", ROOT.parent / "pyblade-ui")).resolve()
sys.path.insert(0, str(LIB / "src"))

import pyblade_ui  # noqa: E402,F401 -- registers the `cn` filter
from pyblade import PyBlade  # noqa: E402
from pyblade_ui.cli.main import main as cli  # noqa: E402
from pyblade_ui.registry import Registry  # noqa: E402

EXAMPLES = ROOT / "docs-src" / "examples"
EXAMPLES_EN = ROOT / "docs-src" / "examples-en"
LANDING = ROOT / "docs-src" / "landing"
PREVIEW = ROOT / "public" / "preview"
MARK = re.compile(r"^\{#\s*example:\s*(.+?)\s*#\}\s*$", re.M)
PROPS = re.compile(r"^@props\((\{.*?\})\)", re.S)

# Data the examples loop over.
CONTEXT = {
    "form": {"errors": {"email": ["Entrez une adresse email valide."]}},
    "payments": [
        {"id": i, "email": e, "status": st, "amount": a}
        for i, (e, st, a) in enumerate([
            ("ken99@example.com", "Réussi", 316), ("abe45@example.com", "Réussi", 242), ("monserrat44@example.com", "En cours", 837),
            ("silas22@example.com", "Réussi", 874), ("carmella@example.com", "Échoué", 721), ("ada@example.com", "Réussi", 150),
            ("grace@example.com", "En cours", 499), ("alan@example.com", "Réussi", 95), ("linus@example.com", "Échoué", 1200),
            ("margaret@example.com", "Réussi", 640), ("dennis@example.com", "En cours", 310), ("barbara@example.com", "Réussi", 77),
        ])
    ],
    "payment_columns": [
        {"key": "status", "label": "Statut", "format": "badge"},
        {"key": "email", "label": "Email", "sortable": True},
        {"key": "amount", "label": "Montant", "sortable": True, "align": "right", "format": "currency"},
    ],
    "visitors": [
        {"month": m, "desktop": d, "mobile": mo}
        for m, d, mo in [("Jan", 186, 80), ("Fév", 305, 200), ("Mar", 237, 120), ("Avr", 73, 190), ("Mai", 209, 130), ("Juin", 214, 140)]
    ],
    "people": [
        {"name": "Ada Lovelace", "email": "ada@example.com", "initials": "AL"},
        {"name": "Grace Hopper", "email": "grace@example.com", "initials": "GH"},
        {"name": "Alan Turing", "email": "alan@example.com", "initials": "AT"},
    ],
    "article_html": (
        "<h2>Un contenu riche</h2><p>Le wrapper <code>prose</code> met en forme du HTML venu d'un CMS ou de Markdown : "
        "<a href='#'>liens</a>, <strong>gras</strong> et listes.</p><ul><li>Premier point</li><li>Second point</li></ul>"
        "<blockquote>Une citation, en italique.</blockquote>"
    ),
    "sidebar_open": True,
    "tags": [f"v1.2.0-beta.{n}" for n in range(50, 0, -1)][:24],
    "invoices": [
        {"id": "INV001", "status": "Payée", "method": "Carte", "amount": "250,00 €"},
        {"id": "INV002", "status": "En attente", "method": "PayPal", "amount": "150,00 €"},
        {"id": "INV003", "status": "Impayée", "method": "Virement", "amount": "350,00 €"},
        {"id": "INV004", "status": "Payée", "method": "Carte", "amount": "450,00 €"},
    ],
}

# The same data in English, for docs-src/examples-en.
CONTEXT_EN = {
    **CONTEXT,
    "form": {"errors": {"email": ["Enter a valid email address."]}},
    "invoices": [
        {"id": "INV001", "status": "Paid", "method": "Credit Card", "amount": "$250.00"},
        {"id": "INV002", "status": "Pending", "method": "PayPal", "amount": "$150.00"},
        {"id": "INV003", "status": "Unpaid", "method": "Bank Transfer", "amount": "$350.00"},
        {"id": "INV004", "status": "Paid", "method": "Credit Card", "amount": "$450.00"},
    ],
    "payments": [
        dict(p, status={"Réussi": "Success", "En cours": "Processing", "Échoué": "Failed"}[p["status"]])
        for p in CONTEXT["payments"]
    ],
    "payment_columns": [
        {"key": "status", "label": "Status", "format": "badge"},
        {"key": "email", "label": "Email", "sortable": True},
        {"key": "amount", "label": "Amount", "sortable": True, "align": "right", "format": "currency"},
    ],
    "visitors": [
        dict(v, month=en) for v, en in zip(CONTEXT["visitors"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun"])
    ],
    "article_html": (
        "<h2>Rich content</h2><p>The <code>prose</code> wrapper styles HTML from a CMS or from Markdown: "
        "<a href='#'>links</a>, <strong>bold text</strong> and lists.</p><ul><li>First point</li><li>Second point</li></ul>"
        "<blockquote>A quote, in italics.</blockquote>"
    ),
}

# Sidebar group titles in English.
GROUPS_EN = {
    "Actions": "Actions", "Formulaires": "Forms", "Données": "Data", "Affichage": "Display",
    "Navigation": "Navigation", "Overlays": "Overlays", "Thème": "Theme", "Blocs": "Blocks", "Autres": "Other",
}

# Order and grouping of the sidebar.
GROUPS = [
    ("Actions", ["button", "button-link", "button-group", "toggle", "toggle-group", "dropdown-menu", "context-menu", "menubar", "command"]),
    ("Formulaires", ["input", "input-group", "textarea", "label", "field", "select", "combobox", "checkbox", "radio-group", "switch", "slider", "input-otp", "calendar", "date-picker"]),
    ("Données", ["table", "data-table", "chart"]),
    ("Affichage", ["card", "item", "badge", "avatar", "alert", "empty", "kbd", "spinner", "separator", "skeleton", "progress", "aspect-ratio", "scroll-area", "resizable", "typography"]),
    ("Navigation", ["sidebar", "navigation-menu", "breadcrumb", "pagination", "tabs", "accordion", "collapsible", "carousel"]),
    ("Overlays", ["dialog", "alert-dialog", "sheet", "drawer", "popover", "hover-card", "tooltip", "toaster"]),
    ("Thème", ["theme-script", "mode-toggle"]),
    ("Blocs", ["sidebar-layout", "login-form"]),
]


def examples_for(name: str, folder: Path = EXAMPLES) -> list[dict]:
    file = folder / f"{name}.html"
    if not file.is_file():
        return []
    text = file.read_text(encoding="utf-8")
    parts = MARK.split(text)
    out = []
    for i in range(1, len(parts), 2):
        head, code = parts[i], parts[i + 1].strip("\n")
        title, *opts = [s.strip() for s in head.split("|")]
        meta = dict(o.split("=", 1) if "=" in o else (o, "1") for o in opts)
        out.append({
            "title": title,
            "code": code.rstrip(),
            "height": int(meta.get("height", 280)),
            "full": "full" in meta,  # a whole page: no padding, no centering
        })
    return out


def props_of(source: str) -> dict:
    m = PROPS.match(source.strip())
    if not m:
        return {}
    try:
        return ast.literal_eval(m.group(1))
    except (ValueError, SyntaxError):
        return {}


def main() -> int:
    registry = Registry(str(LIB / "src" / "pyblade_ui" / "registry"))
    with tempfile.TemporaryDirectory() as tmp:
        site = Path(tmp)
        (site / "pyblade.toml").write_text(
            '[stack]\nframework = "flask"\n[paths]\ntemplates = "templates"\ncomponents = "components"\n'
        )
        (site / "templates").mkdir()
        quiet = open(os.devnull, "w")
        stdout, sys.stdout = sys.stdout, quiet
        try:
            assert cli(["--cwd", str(site), "init", "--base", "neutral", "--color", "neutral"]) == 0
            assert cli(["--cwd", str(site), "add", "--all"]) == 0
        finally:
            sys.stdout = stdout
        theme_css = (site / "static" / "css" / "theme.css").read_text(encoding="utf-8")

        cwd = os.getcwd()
        os.chdir(site)
        engine = PyBlade(dirs=[str(site / "templates")])
        items, rendered, failed = [], [], []
        try:
            for item in registry.items.values():
                files = []
                for path in item.files:
                    source = registry.read_file(path)
                    files.append({"path": f"components/{path}", "content": source, "props": props_of(source)})
                examples = examples_for(item.name)
                examples_en = examples_for(item.name, EXAMPLES_EN)
                for lang, exs, context in (("fr", examples, CONTEXT), ("en", examples_en, CONTEXT_EN)):
                    for ex in exs:
                        try:
                            ex["html"] = engine.render(ex["code"], dict(context))
                            rendered.append(ex["html"])
                        except Exception as exc:  # noqa: BLE001
                            failed.append(f"{lang} {item.name} / {ex['title']}: {exc}")
                            ex["html"] = ""
                items.append({
                    "name": item.name,
                    "title": item.title,
                    "type": item.type.split(":")[1],
                    "description": item.description,
                    "files": files,
                    "dependencies": item.registry_dependencies,
                    "js": item.js,
                    "python": item.python,
                    "usage": item.usage,
                    "examples": examples,
                    "examples_en": examples_en,
                })
            # The landing page's showcase in other languages: docs-src/landing/<lang>/<component>.html
            landing = {}
            for folder in sorted(p for p in LANDING.glob("*") if p.is_dir()):
                landing[folder.name] = {}
                for file in sorted(folder.glob("*.html")):
                    try:
                        html = engine.render(file.read_text(encoding="utf-8"), dict(CONTEXT))
                        landing[folder.name][file.stem] = html
                        rendered.append(html)
                    except Exception as exc:  # noqa: BLE001
                        failed.append(f"landing/{folder.name}/{file.name}: {exc}")
        finally:
            os.chdir(cwd)

    if failed:
        print("Examples that failed to render:\n  " + "\n  ".join(failed), file=sys.stderr)
        return 1

    order = [n for _, names in GROUPS for n in names]
    missing = [i["name"] for i in items if i["name"] not in order]
    groups = [
        {"title": t, "title_en": GROUPS_EN.get(t, t), "items": [n for n in names if n in {i["name"] for i in items}]}
        for t, names in GROUPS
    ]
    if missing:
        groups.append({"title": "Autres", "title_en": "Other", "items": missing})
    data = {"groups": groups, "items": items, "landing": landing}
    (ROOT / "content").mkdir(exist_ok=True)
    (ROOT / "content" / "registry.json").write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")

    # The previews' stylesheet: Tailwind over the rendered HTML and the component sources.
    PREVIEW.mkdir(parents=True, exist_ok=True)
    work = ROOT / ".preview-build"
    shutil.rmtree(work, ignore_errors=True)
    work.mkdir()
    (work / "theme.css").write_text(theme_css, encoding="utf-8")
    (work / "rendered.html").write_text("\n".join(rendered), encoding="utf-8")
    (work / "sources.html").write_text("\n".join(f["content"] for i in items for f in i["files"]), encoding="utf-8")
    (work / "input.css").write_text(
        '@import "tailwindcss" source(none);\n@import "./theme.css";\n@source "./rendered.html";\n@source "./sources.html";\n'
        "[x-cloak] { display: none !important; }\n"
        "@layer base { * { @apply border-border outline-ring/50; } body { @apply text-foreground; } }\n",
        encoding="utf-8",
    )
    subprocess.run(
        ["npx", "@tailwindcss/cli", "-i", str(work / "input.css"), "-o", str(PREVIEW / "preview.css"), "--minify"],
        cwd=ROOT, check=True, capture_output=True,
    )
    shutil.copy(ROOT / "node_modules" / "alpinejs" / "dist" / "cdn.min.js", PREVIEW / "alpine.min.js")
    shutil.rmtree(work, ignore_errors=True)

    n = sum(len(i["examples"]) for i in items)
    print(f"Wrote content/registry.json ({len(items)} items, {n} examples) and public/preview/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
