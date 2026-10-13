import type { ReactNode } from "react";
import { CodeBlock } from "@/app/components/docs/code-block";
import { DocTabs } from "@/app/components/docs/tabs";
import type { Locale } from "@/lib/i18n";
import { H2, P } from "./doc-page";

type Extra = { toc: { id: string; label: string }[]; content: ReactNode };

const T = {
  fr: {
    server: "État côté serveur",
    colors: "Couleurs",
    keyboard: "Clavier et mobile",
    serverBody: [
      "Quand on replie ou déplie le sidebar, il écrit le cookie",
      "(7 jours). À la requête suivante, le serveur le relit et passe",
      "au provider : la page arrive déjà dans le bon état, sans clignotement ni attente du JavaScript.",
    ],
    django: "# ...\n                \"pyblade_ui.context_processors.sidebar\",  # ajoute sidebar_open",
    thenTemplate: "Puis dans le template :",
    acceptsRequest: [
      "accepte la requête de Django (",
      ") comme celle de Flask, Starlette, FastAPI, Litestar, Quart ou Sanic (",
      ").",
    ],
    colorsBody: ["Le sidebar a ses propres variables :", "Si votre", "date d'avant le sidebar, régénérez-le :"],
    widths: ["Les largeurs se règlent sur le provider :", "(16rem),", "(18rem) et", "(3rem), par exemple"],
    keyboardBody: [
      "replie ou déplie le sidebar. Sous 768px, il devient un panneau qui glisse par-dessus la page, avec un fond cliquable et la touche Échap pour le fermer ; l'état mobile n'est pas enregistré dans le cookie.",
      "(ou",
    ],
  },
  en: {
    server: "Server-side state",
    colors: "Colors",
    keyboard: "Keyboard and mobile",
    serverBody: [
      "When the sidebar is collapsed or expanded, it writes the cookie",
      "(7 days). On the next request the server reads it back and passes",
      "to the provider: the page arrives in the right state, with no flash and no wait for JavaScript.",
    ],
    django: "# ...\n                \"pyblade_ui.context_processors.sidebar\",  # adds sidebar_open",
    thenTemplate: "Then in the template:",
    acceptsRequest: [
      "accepts Django's request (",
      ") as well as Flask, Starlette, FastAPI, Litestar, Quart or Sanic requests (",
      ").",
    ],
    colorsBody: ["The sidebar has its own variables:", "If your", "predates the sidebar, regenerate it:"],
    widths: ["Widths are set on the provider:", "(16rem),", "(18rem) and", "(3rem), for example"],
    keyboardBody: [
      "collapses or expands the sidebar. Below 768px it becomes a panel that slides over the page, with a clickable backdrop and Escape to close it; the mobile state is not saved in the cookie.",
      "(or",
    ],
  },
};

/** Sections that only some components need, placed after Usage. */
export function extrasFor(locale: Locale): Record<string, Extra> {
  const t = T[locale];
  return {
    sidebar: {
      toc: [
        { id: "server-state", label: t.server },
        { id: "colors", label: t.colors },
        { id: "keyboard", label: t.keyboard },
      ],
      content: (
        <>
          <H2 id="server-state">{t.server}</H2>
          <P>
            {t.serverBody[0]} <code>sidebar_state=true|false</code> {t.serverBody[1]} <code>sidebar_open</code> {t.serverBody[2]}
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
                ${t.django.trim()}
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
            {t.thenTemplate} <code>{`<pb-ui.sidebar-provider :open="sidebar_open">`}</code>.{" "}
            <code>sidebar_open(request, default=True)</code> {t.acceptsRequest[0]}
            <code>request.COOKIES</code>
            {t.acceptsRequest[1]}
            <code>request.cookies</code>
            {t.acceptsRequest[2]}
          </P>

          <H2 id="colors">{t.colors}</H2>
          <P>
            {t.colorsBody[0]} <code>--sidebar</code>, <code>--sidebar-foreground</code>, <code>--sidebar-primary</code>,{" "}
            <code>--sidebar-accent</code>, <code>--sidebar-border</code>, <code>--sidebar-ring</code>. {t.colorsBody[1]}{" "}
            <code>theme.css</code> {t.colorsBody[2]}
          </P>
          <CodeBlock lang="bash" code="pyblade-ui theme set" />
          <P>
            {t.widths[0]} <code>--sidebar-width</code> {t.widths[1]} <code>--sidebar-width-mobile</code> {t.widths[2]}{" "}
            <code>--sidebar-width-icon</code> {t.widths[3]} <code>{`style="--sidebar-width: 20rem"`}</code>.
          </P>

          <H2 id="keyboard">{t.keyboard}</H2>
          <P>
            <code>Ctrl + B</code> {t.keyboardBody[1]} <code>⌘ + B</code>) {t.keyboardBody[0]}
          </P>
        </>
      ),
    },
  };
}
