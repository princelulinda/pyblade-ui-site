import { CodeBlock } from "@/app/components/docs/code-block";
import { DocPage, H2, P } from "../doc-page";

export const metadata = { title: "Thèmes — PyBlade UI" };

const BASES = ["neutral", "zinc", "slate", "stone", "gray"];
const COLORS = ["neutral", "blue", "green", "violet", "rose", "red", "orange", "yellow"];

export default function Theming() {
  return (
    <DocPage
      crumbs={["Docs", "Thèmes"]}
      title="Thèmes"
      description="Des variables CSS au format shadcn, en OKLCH, avec un mode clair et un mode sombre."
      toc={[
        { id: "choisir", label: "Choisir un thème" },
        { id: "variables", label: "Les variables" },
        { id: "personnaliser", label: "Personnaliser" },
        { id: "sombre", label: "Mode sombre" },
      ]}
      prev={{ href: "/docs/installation", label: "Installation" }}
      next={{ href: "/docs/cli", label: "CLI" }}
    >
      <H2 id="choisir">Choisir un thème</H2>
      <CodeBlock lang="bash" code={`pyblade-ui theme list\npyblade-ui theme set --base slate --color rose --radius 0.75rem`} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <div className="text-sm font-medium">Bases</div>
          <P>La teinte des gris : fonds, bordures, texte atténué.</P>
          <div className="mt-3 flex flex-wrap gap-1.5">{BASES.map((b) => <code key={b} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{b}</code>)}</div>
        </div>
        <div className="rounded-xl border border-border p-4">
          <div className="text-sm font-medium">Couleurs</div>
          <P>Elles définissent <code>--primary</code> et <code>--ring</code>.</P>
          <div className="mt-3 flex flex-wrap gap-1.5">{COLORS.map((c) => <code key={c} className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{c}</code>)}</div>
        </div>
      </div>
      <P>Le rayon, <code>--radius</code>, sert à calculer <code>rounded-sm</code>, <code>rounded-md</code>, <code>rounded-lg</code> et <code>rounded-xl</code>.</P>

      <H2 id="variables">Les variables</H2>
      <P>
        <code>--background</code>, <code>--foreground</code>, <code>--card</code>, <code>--popover</code>, <code>--primary</code>,{" "}
        <code>--secondary</code>, <code>--muted</code>, <code>--accent</code>, <code>--destructive</code>, <code>--border</code>,{" "}
        <code>--input</code>, <code>--ring</code>, <code>--chart-1</code> à <code>--chart-5</code>, plus <code>--success</code> et{" "}
        <code>--warning</code> avec leur <code>-foreground</code>. Elles sont exposées à Tailwind via <code>@theme inline</code> :
        écrivez <code>bg-primary</code>, <code>text-muted-foreground</code>, <code>border-border</code>…
      </P>

      <H2 id="personnaliser">Personnaliser</H2>
      <P>Écrivez vos variables sous le marqueur de <code>theme.css</code> : <code>theme set</code> régénère tout le fichier sauf cette partie.</P>
      <CodeBlock
        lang="css"
        filename="static/css/theme.css"
        code={`/* pyblade-ui:custom -- everything below this line is kept when the theme is regenerated */
:root { --primary: oklch(0.6 0.2 160); }
.dark { --primary: oklch(0.7 0.18 160); }`}
      />

      <H2 id="sombre">Mode sombre</H2>
      <P>
        Il repose sur la classe <code>.dark</code> posée sur <code>&lt;html&gt;</code>. <code>theme-script</code> l&apos;applique avant
        l&apos;affichage de la page, sans clignotement, et <code>mode-toggle</code> la bascule.
      </P>
    </DocPage>
  );
}
