import Link from "next/link";
import type { ReactNode } from "react";
import { CodeBlock } from "@/app/components/docs/code-block";
import { IsoGlyph } from "@/app/components/iso-glyph";
import type { Locale } from "@/lib/i18n";
import { docsDictionaries, docsPath } from "@/lib/i18n-docs";
import { blockCount, componentCount, getItem, groups } from "@/lib/registry";
import { DocPage, H2, P } from "./doc-page";

/** One string or element per language. */
const L = <T extends ReactNode>(locale: Locale, fr: T, en: T) => (locale === "fr" ? fr : en);

const link = "font-medium text-foreground underline underline-offset-4";


/* ——— Introduction ——— */

export function IntroPage({ locale }: { locale: Locale }) {
  const t = docsDictionaries[locale];
  const cards: [string, string, string][] =
    locale === "fr"
      ? [
          ["layers", "Le code est à vous", "Chaque composant est un template dans votre dossier components."],
          ["tokens", "Thèmes en variables CSS", "Format shadcn, OKLCH, Tailwind CSS v4, clair et sombre."],
          ["terminal", "Un CLI complet", "Ajouter, comparer, mettre à jour, changer de thème."],
        ]
      : [
          ["layers", "The code is yours", "Every component is a template in your components folder."],
          ["tokens", "Themes as CSS variables", "shadcn format, OKLCH, Tailwind CSS v4, light and dark."],
          ["terminal", "A complete CLI", "Add, compare, update, switch themes."],
        ];
  return (
    <DocPage
      crumbs={[t.docs, t.intro]}
      title={t.intro}
      description={L(
        locale,
        "Des composants beaux et accessibles, à copier dans votre projet PyBlade. Sur le modèle de shadcn/ui.",
        "Beautiful, accessible components to copy into your PyBlade project. In the spirit of shadcn/ui.",
      )}
      onThisPage={t.onThisPage}
      toc={[
        { id: "idea", label: L(locale, "Le principe", "The idea") },
        { id: "quick-start", label: L(locale, "Démarrage rapide", "Quick start") },
        { id: "components", label: t.components },
      ]}
      next={{ href: docsPath(locale, "/installation"), label: t.installation }}
    >
      <H2 id="idea">{L(locale, "Le principe", "The idea")}</H2>
      <P>
        {L(
          locale,
          <>
            PyBlade UI n&apos;est <strong className="text-foreground">pas</strong> une bibliothèque qu&apos;on importe. La commande{" "}
            <code>pyblade-ui add</code> copie le code des composants dans votre projet. Le code vous appartient ensuite : vous le
            modifiez librement, sans attendre une nouvelle version.
          </>,
          <>
            PyBlade UI is <strong className="text-foreground">not</strong> a library you import. The <code>pyblade-ui add</code>{" "}
            command copies the components&apos; code into your project. From then on the code is yours: change it as you like,
            without waiting for a new release.
          </>,
        )}
      </P>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map(([g, title, body]) => (
          <div key={title} className="rounded-xl border border-border bg-surface p-4">
            <IsoGlyph name={g as "layers"} className="mx-auto w-36" />
            <div className="mt-1 font-medium">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{body}</div>
          </div>
        ))}
      </div>

      <H2 id="quick-start">{L(locale, "Démarrage rapide", "Quick start")}</H2>
      <CodeBlock
        lang="bash"
        copyLabel={t.copyCode}
        code={`pip install pyblade-ui
cd ${L(locale, "mon-projet-pyblade            # là où se trouve pyblade.toml", "my-pyblade-project            # where pyblade.toml is")}
pyblade-ui init --base zinc --color blue
pyblade-ui add button card dialog`}
      />
      <P>
        {L(
          locale,
          <>
            Puis utilisez-les dans n&apos;importe quel template. Voir{" "}
            <Link href={docsPath(locale, "/installation")} className={link}>Installation</Link> pour le détail.
          </>,
          <>
            Then use them in any template. See <Link href={docsPath(locale, "/installation")} className={link}>Installation</Link>{" "}
            for the details.
          </>,
        )}
      </P>
      <CodeBlock
        copyLabel={t.copyCode}
        code={`<pb-ui.card class="max-w-md">
  <pb-ui.card-header>
    <pb-ui.card-title>${L(locale, "Équipe", "Team")}</pb-ui.card-title>
    <pb-ui.card-description>${L(locale, "Invitez vos collègues.", "Invite your colleagues.")}</pb-ui.card-description>
  </pb-ui.card-header>
  <pb-ui.card-content>
    <pb-ui.button variant="outline" class="w-full">${L(locale, "Inviter", "Invite")}</pb-ui.button>
  </pb-ui.card-content>
</pb-ui.card>`}
      />

      <H2 id="components">{t.components}</H2>
      <P>
        {L(
          locale,
          `${componentCount} composants et ${blockCount} bloc${blockCount > 1 ? "s" : ""}, aujourd'hui.`,
          `${componentCount} components and ${blockCount} block${blockCount > 1 ? "s" : ""}, today.`,
        )}
      </P>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {locale === "en" ? g.title_en ?? g.title : g.title}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.items.map((n) => {
                const i = getItem(n)!;
                return (
                  <Link
                    key={n}
                    href={docsPath(locale, `/components/${n}`)}
                    className="rounded-lg border border-border px-4 py-3 transition hover:border-ring hover:bg-muted/40"
                  >
                    <div className="text-sm font-medium">{i.title}</div>
                    <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{i.description}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DocPage>
  );
}

/* ——— Installation ——— */

export function InstallationPage({ locale }: { locale: Locale }) {
  const t = docsDictionaries[locale];
  return (
    <DocPage
      crumbs={[t.docs, t.installation]}
      title={t.installation}
      description={L(locale, "Configurer PyBlade UI dans un projet PyBlade existant.", "Set up PyBlade UI in an existing PyBlade project.")}
      onThisPage={t.onThisPage}
      toc={[
        { id: "requirements", label: L(locale, "Prérequis", "Requirements") },
        { id: "init", label: L(locale, "Initialiser", "Initialize") },
        { id: "framework", label: L(locale, "Brancher le framework", "Hook up the framework") },
        { id: "head", label: L(locale, "Le <head>", "The <head>") },
        { id: "add", label: L(locale, "Ajouter des composants", "Add components") },
      ]}
      prev={{ href: docsPath(locale), label: t.intro }}
      next={{ href: docsPath(locale, "/theming"), label: t.theming }}
    >
      <H2 id="requirements">{L(locale, "Prérequis", "Requirements")}</H2>
      <P>
        {L(
          locale,
          "Python 3.11 ou plus récent, PyBlade 0.3 ou plus récent et Tailwind CSS v4. Les composants interactifs ont aussi besoin d'Alpine.js.",
          "Python 3.11 or newer, PyBlade 0.3 or newer and Tailwind CSS v4. Interactive components also need Alpine.js.",
        )}
      </P>

      <H2 id="init">{L(locale, "Initialiser", "Initialize")}</H2>
      <CodeBlock
        lang="bash"
        copyLabel={t.copyCode}
        code={`pip install pyblade-ui\ncd ${L(locale, "mon-projet-pyblade", "my-pyblade-project")}\npyblade-ui init --base zinc --color blue`}
      />
      <P>
        {L(
          locale,
          <>
            <code>init</code> écrit <code>pyblade-ui.toml</code>, génère <code>static/css/theme.css</code>, ajoute{" "}
            <code>@import &quot;./theme.css&quot;;</code> dans <code>static/css/tailwind.css</code>, puis installe{" "}
            <code>theme-script</code> et <code>mode-toggle</code>.
          </>,
          <>
            <code>init</code> writes <code>pyblade-ui.toml</code>, generates <code>static/css/theme.css</code>, adds{" "}
            <code>@import &quot;./theme.css&quot;;</code> to <code>static/css/tailwind.css</code>, then installs{" "}
            <code>theme-script</code> and <code>mode-toggle</code>.
          </>,
        )}
      </P>

      <H2 id="framework">{L(locale, "Brancher le framework", "Hook up the framework")}</H2>
      <CodeBlock
        lang="python"
        copyLabel={t.copyCode}
        code={L(
          locale,
          `# Django : settings.py\nINSTALLED_APPS = [..., "pyblade_ui"]\n\n# Flask, FastAPI… : une fois au démarrage\nimport pyblade_ui`,
          `# Django: settings.py\nINSTALLED_APPS = [..., "pyblade_ui"]\n\n# Flask, FastAPI…: once, at startup\nimport pyblade_ui`,
        )}
      />

      <H2 id="head">{L(locale, "Le <head>", "The <head>")}</H2>
      <CodeBlock
        filename="templates/layout.html"
        copyLabel={t.copyCode}
        code={`<head>
  <pb-ui.theme-script />
  <link rel="stylesheet" href="@static('css/app.css')" />
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"></script>
</head>`}
      />
      <P>
        {L(
          locale,
          <>Adaptez le chemin de la feuille de style compilée (<code>@static</code>) à votre framework.</>,
          <>Adjust the path of the compiled stylesheet (<code>@static</code>) to your framework.</>,
        )}
      </P>

      <H2 id="add">{L(locale, "Ajouter des composants", "Add components")}</H2>
      <CodeBlock
        lang="bash"
        copyLabel={t.copyCode}
        code={`pyblade-ui add button card dialog\n${L(locale, "# ou tout d'un coup", "# or everything at once")}\npyblade-ui add --all`}
      />
      <P>
        {L(
          locale,
          <>
            Les dépendances sont copiées avec : <code>dialog</code> installe aussi <code>button</code>. <code>add</code> ne remplace
            jamais un fichier que vous avez modifié, sauf avec <code>--overwrite</code>.
          </>,
          <>
            Dependencies come along: <code>dialog</code> also installs <code>button</code>. <code>add</code> never replaces a file
            you have changed, unless you pass <code>--overwrite</code>.
          </>,
        )}
      </P>
    </DocPage>
  );
}

/* ——— Theming ——— */

const BASES = ["neutral", "zinc", "slate", "stone", "gray"];
const COLORS = ["neutral", "blue", "green", "violet", "rose", "red", "orange", "yellow"];

export function ThemingPage({ locale }: { locale: Locale }) {
  const t = docsDictionaries[locale];
  const chips = (list: string[]) => (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {list.map((x) => <code key={x} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{x}</code>)}
    </div>
  );
  return (
    <DocPage
      crumbs={[t.docs, t.theming]}
      title={t.theming}
      description={L(
        locale,
        "Des variables CSS au format shadcn, en OKLCH, avec un mode clair et un mode sombre.",
        "shadcn-style CSS variables in OKLCH, with a light and a dark mode.",
      )}
      onThisPage={t.onThisPage}
      toc={[
        { id: "choose", label: L(locale, "Choisir un thème", "Choose a theme") },
        { id: "variables", label: L(locale, "Les variables", "The variables") },
        { id: "customize", label: L(locale, "Personnaliser", "Customize") },
        { id: "dark-mode", label: L(locale, "Mode sombre", "Dark mode") },
      ]}
      prev={{ href: docsPath(locale, "/installation"), label: t.installation }}
      next={{ href: docsPath(locale, "/cli"), label: t.cli }}
    >
      <H2 id="choose">{L(locale, "Choisir un thème", "Choose a theme")}</H2>
      <CodeBlock lang="bash" copyLabel={t.copyCode} code={`pyblade-ui theme list\npyblade-ui theme set --base slate --color rose --radius 0.75rem`} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <div className="text-sm font-medium">{L(locale, "Bases", "Bases")}</div>
          <P>{L(locale, "La teinte des gris : fonds, bordures, texte atténué.", "The tint of the grays: backgrounds, borders, muted text.")}</P>
          {chips(BASES)}
        </div>
        <div className="rounded-xl border border-border p-4">
          <div className="text-sm font-medium">{L(locale, "Couleurs", "Colors")}</div>
          <P>
            {L(locale, <>Elles définissent <code>--primary</code> et <code>--ring</code>.</>, <>They set <code>--primary</code> and <code>--ring</code>.</>)}
          </P>
          {chips(COLORS)}
        </div>
      </div>
      <P>
        {L(
          locale,
          <>Le rayon, <code>--radius</code>, sert à calculer <code>rounded-sm</code>, <code>rounded-md</code>, <code>rounded-lg</code> et <code>rounded-xl</code>.</>,
          <>The radius, <code>--radius</code>, is used to compute <code>rounded-sm</code>, <code>rounded-md</code>, <code>rounded-lg</code> and <code>rounded-xl</code>.</>,
        )}
      </P>

      <H2 id="variables">{L(locale, "Les variables", "The variables")}</H2>
      <P>
        <code>--background</code>, <code>--foreground</code>, <code>--card</code>, <code>--popover</code>, <code>--primary</code>,{" "}
        <code>--secondary</code>, <code>--muted</code>, <code>--accent</code>, <code>--destructive</code>, <code>--border</code>,{" "}
        <code>--input</code>, <code>--ring</code>, <code>--chart-1</code> {L(locale, "à", "to")} <code>--chart-5</code>,{" "}
        {L(locale, "plus", "plus")} <code>--success</code> {L(locale, "et", "and")} <code>--warning</code>{" "}
        {L(locale, "avec leur", "with their")} <code>-foreground</code>,{" "}
        {L(locale, "et les variables du sidebar", "and the sidebar variables")} <code>--sidebar-*</code>.{" "}
        {L(
          locale,
          <>Elles sont exposées à Tailwind via <code>@theme inline</code> : écrivez <code>bg-primary</code>, <code>text-muted-foreground</code>, <code>border-border</code>…</>,
          <>They are exposed to Tailwind through <code>@theme inline</code>: write <code>bg-primary</code>, <code>text-muted-foreground</code>, <code>border-border</code>…</>,
        )}
      </P>

      <H2 id="customize">{L(locale, "Personnaliser", "Customize")}</H2>
      <P>
        {L(
          locale,
          <>Écrivez vos variables sous le marqueur de <code>theme.css</code> : <code>theme set</code> régénère tout le fichier sauf cette partie.</>,
          <>Write your variables below the marker in <code>theme.css</code>: <code>theme set</code> regenerates the whole file except that part.</>,
        )}
      </P>
      <CodeBlock
        lang="css"
        filename="static/css/theme.css"
        copyLabel={t.copyCode}
        code={`/* pyblade-ui:custom -- everything below this line is kept when the theme is regenerated */
:root { --primary: oklch(0.6 0.2 160); }
.dark { --primary: oklch(0.7 0.18 160); }`}
      />

      <H2 id="dark-mode">{L(locale, "Mode sombre", "Dark mode")}</H2>
      <P>
        {L(
          locale,
          <>
            Il repose sur la classe <code>.dark</code> posée sur <code>&lt;html&gt;</code>. <code>theme-script</code> l&apos;applique
            avant l&apos;affichage de la page, sans clignotement, et <code>mode-toggle</code> la bascule.
          </>,
          <>
            It relies on the <code>.dark</code> class on <code>&lt;html&gt;</code>. <code>theme-script</code> applies it before the
            page paints, with no flash, and <code>mode-toggle</code> switches it.
          </>,
        )}
      </P>
    </DocPage>
  );
}

/* ——— CLI ——— */

export function CliPage({ locale }: { locale: Locale }) {
  const t = docsDictionaries[locale];
  const commands: [string, string, string][] = [
    ["init", "pyblade-ui init --base zinc --color blue --radius 0.625rem", L(locale, "Configure le projet et génère le thème.", "Sets up the project and generates the theme.")],
    [
      "add",
      "pyblade-ui add button card\npyblade-ui add --all --dry-run",
      L(
        locale,
        "Copie des composants avec leurs dépendances. --overwrite remplace vos fichiers modifiés.",
        "Copies components with their dependencies. --overwrite replaces files you have changed.",
      ),
    ],
    ["list", "pyblade-ui list", L(locale, "Liste le registre et indique ce qui est déjà installé.", "Lists the registry and shows what is already installed.")],
    [
      "diff",
      "pyblade-ui diff button",
      L(locale, "Montre vos modifications par rapport au registre, avant une mise à jour.", "Shows your changes against the registry, before an update."),
    ],
    ["theme", "pyblade-ui theme list\npyblade-ui theme show\npyblade-ui theme set --color rose", L(locale, "Gère le thème.", "Manages the theme.")],
  ];
  return (
    <DocPage
      crumbs={[t.docs, t.cli]}
      title={t.cli}
      description={L(
        locale,
        "La commande pyblade-ui ajoute, compare et met à jour les composants de votre projet.",
        "The pyblade-ui command adds, compares and updates the components of your project.",
      )}
      onThisPage={t.onThisPage}
      toc={commands.map(([c]) => ({ id: c, label: c }))}
      prev={{ href: docsPath(locale, "/theming"), label: t.theming }}
      next={{ href: docsPath(locale, "/components/button"), label: "Button" }}
    >
      {commands.map(([c, code, d]) => (
        <div key={c} className="space-y-3">
          <H2 id={c}>{c}</H2>
          <P>{d}</P>
          <CodeBlock lang="bash" code={code} copyLabel={t.copyCode} />
        </div>
      ))}
    </DocPage>
  );
}
