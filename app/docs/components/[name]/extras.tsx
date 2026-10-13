import type { ReactNode } from "react";
import { CodeBlock } from "@/app/components/docs/code-block";
import { DocTabs } from "@/app/components/docs/tabs";
import { H2, P } from "../../doc-page";

/** Sections that only some components need, placed after Utilisation. */
export const extras: Record<string, { toc: { id: string; label: string }[]; content: ReactNode }> = {
  sidebar: {
    toc: [
      { id: "cote-serveur", label: "État côté serveur" },
      { id: "theme", label: "Couleurs" },
      { id: "clavier", label: "Clavier et mobile" },
    ],
    content: (
      <>
        <H2 id="cote-serveur">État côté serveur</H2>
        <P>
          Quand on replie ou déplie le sidebar, il écrit le cookie <code>sidebar_state=true|false</code> (7 jours). À la requête
          suivante, le serveur le relit et passe <code>sidebar_open</code> au provider : la page arrive déjà dans le bon état,
          sans clignotement ni attente du JavaScript.
        </P>
        <DocTabs
          tabs={[
            {
              label: "Django",
              content: (
                <CodeBlock
                  lang="python"
                  filename="settings.py"
                  code={`TEMPLATES = [
    {
        "BACKEND": "pyblade.django.PyBladeEngine",
        # ...
        "OPTIONS": {
            "context_processors": [
                # ...
                "pyblade_ui.context_processors.sidebar",  # adds sidebar_open
            ],
        },
    },
]`}
                />
              ),
            },
            {
              label: "Flask",
              content: (
                <CodeBlock
                  lang="python"
                  code={`from flask import request
from pyblade_ui import sidebar_open

@app.get("/dashboard")
def dashboard():
    return render("dashboard", sidebar_open=sidebar_open(request))`}
                />
              ),
            },
            {
              label: "FastAPI",
              content: (
                <CodeBlock
                  lang="python"
                  code={`from fastapi import Request
from pyblade_ui import sidebar_open

@app.get("/dashboard")
def dashboard(request: Request):
    return render("dashboard", sidebar_open=sidebar_open(request))`}
                />
              ),
            },
          ]}
        />
        <P>
          Puis dans le template : <code>{`<pb-ui.sidebar-provider :open="sidebar_open">`}</code>.{" "}
          <code>sidebar_open(request, default=True)</code> accepte la requête de Django (<code>request.COOKIES</code>) comme
          celle de Flask, Starlette, FastAPI, Litestar, Quart ou Sanic (<code>request.cookies</code>).
        </P>

        <H2 id="theme">Couleurs</H2>
        <P>
          Le sidebar a ses propres variables : <code>--sidebar</code>, <code>--sidebar-foreground</code>,{" "}
          <code>--sidebar-primary</code>, <code>--sidebar-accent</code>, <code>--sidebar-border</code>,{" "}
          <code>--sidebar-ring</code>. Si votre <code>theme.css</code> date d&apos;avant le sidebar, régénérez-le :
        </P>
        <CodeBlock lang="bash" code="pyblade-ui theme set" />
        <P>
          Les largeurs se règlent sur le provider : <code>--sidebar-width</code> (16rem), <code>--sidebar-width-mobile</code>{" "}
          (18rem) et <code>--sidebar-width-icon</code> (3rem), par exemple{" "}
          <code>{`style="--sidebar-width: 20rem"`}</code>.
        </P>

        <H2 id="clavier">Clavier et mobile</H2>
        <P>
          <code>Ctrl + B</code> (ou <code>⌘ + B</code>) replie ou déplie le sidebar. Sous 768px, il devient un panneau qui glisse
          par-dessus la page, avec un fond cliquable et la touche Échap pour le fermer ; l&apos;état mobile n&apos;est pas
          enregistré dans le cookie.
        </P>
      </>
    ),
  },
};
