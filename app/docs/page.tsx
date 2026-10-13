import Link from "next/link";
import { CodeBlock } from "@/app/components/docs/code-block";
import { IsoGlyph } from "@/app/components/iso-glyph";
import { blockCount, componentCount, groups, getItem } from "@/lib/registry";
import { DocPage, H2, P } from "./doc-page";

export const metadata = { title: "Introduction — PyBlade UI" };

export default function Intro() {
  return (
    <DocPage
      crumbs={["Docs", "Introduction"]}
      title="Introduction"
      description="Des composants beaux et accessibles, à copier dans votre projet PyBlade. Sur le modèle de shadcn/ui."
      toc={[
        { id: "principe", label: "Le principe" },
        { id: "demarrage", label: "Démarrage rapide" },
        { id: "composants", label: "Composants" },
      ]}
      next={{ href: "/docs/installation", label: "Installation" }}
    >
      <H2 id="principe">Le principe</H2>
      <P>
        PyBlade UI n&apos;est <strong className="text-foreground">pas</strong> une bibliothèque qu&apos;on importe. La commande{" "}
        <code>pyblade-ui add</code> copie le code des composants dans votre projet. Le code vous appartient ensuite : vous le
        modifiez librement, sans attendre une nouvelle version.
      </P>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["layers", "Le code est à vous", "Chaque composant est un template dans votre dossier components."],
          ["tokens", "Thèmes en variables CSS", "Format shadcn, OKLCH, Tailwind CSS v4, clair et sombre."],
          ["terminal", "Un CLI complet", "Ajouter, comparer, mettre à jour, changer de thème."],
        ].map(([g, t, d]) => (
          <div key={t} className="rounded-xl border border-border bg-surface p-4">
            <IsoGlyph name={g as "layers"} className="mx-auto w-36" />
            <div className="mt-1 font-medium">{t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{d}</div>
          </div>
        ))}
      </div>

      <H2 id="demarrage">Démarrage rapide</H2>
      <CodeBlock
        lang="bash"
        code={`pip install pyblade-ui
cd mon-projet-pyblade            # là où se trouve pyblade.toml
pyblade-ui init --base zinc --color blue
pyblade-ui add button card dialog`}
      />
      <P>
        Puis utilisez-les dans n&apos;importe quel template. Voir <Link href="/docs/installation" className="font-medium text-foreground underline underline-offset-4">Installation</Link> pour le détail.
      </P>
      <CodeBlock
        code={`<pb-ui.card class="max-w-md">
  <pb-ui.card-header>
    <pb-ui.card-title>Équipe</pb-ui.card-title>
    <pb-ui.card-description>Invitez vos collègues.</pb-ui.card-description>
  </pb-ui.card-header>
  <pb-ui.card-content>
    <pb-ui.button variant="outline" class="w-full">Inviter</pb-ui.button>
  </pb-ui.card-content>
</pb-ui.card>`}
      />

      <H2 id="composants">Composants</H2>
      <P>
        {componentCount} composants et {blockCount} bloc{blockCount > 1 ? "s" : ""}, aujourd&apos;hui.
      </P>
      <div className="space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{g.title}</div>
            <div className="grid gap-2 sm:grid-cols-2">
              {g.items.map((n) => {
                const i = getItem(n)!;
                return (
                  <Link key={n} href={`/docs/components/${n}`} className="rounded-lg border border-border px-4 py-3 transition hover:border-ring hover:bg-muted/40">
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
