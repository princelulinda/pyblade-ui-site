import Link from "next/link";
import { CodeBlock } from "@/app/components/docs/code-block";
import { blockCount, componentCount } from "@/lib/registry";
import { IsoGlyph } from "./components/iso-glyph";
import { Showcase } from "./components/showcase";
import { Logo, SiteHeader } from "./components/site-header";
import { CopyCommand, HeroFigure } from "./components/ui";

const FEATURES = [
  {
    glyph: "layers",
    title: "Le code est à vous",
    body: "Pas une dépendance : chaque composant est copié dans votre dossier components, prêt à être lu, modifié, étendu.",
  },
  {
    glyph: "tokens",
    title: "Thèmes en variables CSS",
    body: "Au format shadcn, en OKLCH, avec un mode clair et un mode sombre. 5 bases × 8 couleurs, et vos propres variables.",
  },
  {
    glyph: "keys",
    title: "Accessible par défaut",
    body: "Navigation au clavier, focus visible et rôles ARIA. Les champs natifs restent natifs et se postent avec le formulaire.",
  },
  {
    glyph: "template",
    title: "Pensé pour le serveur",
    body: "Des composants PyBlade avec props et slots. Erreurs de formulaire avec @error, données Python avec tojson, état du sidebar lu dans un cookie.",
  },
  {
    glyph: "terminal",
    title: "Un CLI complet",
    body: "pyblade-ui ajoute un composant et ses dépendances, montre vos modifications avec diff, et change de thème en une commande.",
  },
  {
    glyph: "compose",
    title: "Des blocs prêts à l'emploi",
    body: "Une application avec sidebar, un formulaire de connexion : assemblés à partir des mêmes composants, à copier et adapter.",
  },
] as const;

const STATS = [
  [String(componentCount), "composants"],
  [String(blockCount), "blocs prêts à l'emploi"],
  ["40", "thèmes (5 bases × 8 couleurs)"],
  ["MIT", "licence open source"],
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="iso-grid fade-radial pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <Link
            href="/docs/components/sidebar"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition hover:border-ring hover:text-foreground"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">Nouveau</span>
            Sidebar, data-table, chart et date-picker
            <span aria-hidden>→</span>
          </Link>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Des composants
            <br />
            qu&apos;on prend, <span className="text-muted-foreground">pas qu&apos;on installe.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Des composants beaux et accessibles pour PyBlade, sur le modèle de shadcn/ui. Prenez celui dont vous avez besoin,
            copiez-le dans vos templates, et faites-en ce que vous voulez.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Commencer
              <span aria-hidden>→</span>
            </Link>
            <a
              href="#composants"
              className="inline-flex h-11 items-center rounded-xl border border-border bg-surface/80 px-5 text-sm font-medium backdrop-blur transition hover:bg-muted"
            >
              Voir les composants
            </a>
          </div>
          <div className="mt-6">
            <CopyCommand command="pip install pyblade-ui" />
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[28px] border border-border bg-surface/60 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="rounded-[22px] border border-border bg-surface">
              <HeroFigure />
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
            survolez le plateau : chaque composant sort de son emplacement
          </p>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
        {STATS.map(([n, l], i) => (
          <div key={l} className={`py-8 ${i > 0 ? "md:border-l" : ""} ${i % 2 ? "border-l" : ""} border-border pl-6`}>
            <div className="text-3xl font-semibold tracking-tight">{n}</div>
            <div className="mt-1 text-sm text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{kicker}</div>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg text-muted-foreground">{body}</p>
    </div>
  );
}

function Components() {
  return (
    <section id="composants" className="relative scroll-mt-16 border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Le kit"
          title="Les vrais composants, en direct."
          body="Chaque aperçu est rendu par PyBlade à partir du code que vous copiez. Cliquez, tapez, ouvrez : ils fonctionnent."
        />
        <div className="mt-14">
          <Showcase />
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/docs/components/button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-medium transition hover:bg-muted"
          >
            Les {componentCount} composants <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          kicker="Pourquoi PyBlade UI"
          title="Construit comme une bibliothèque. Possédé comme votre code."
          body="Tout ce qu'on attend d'un système de composants, sans dépendance à mettre à jour."
        />
        <div className="mt-14 grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="group relative -mb-px -mr-px border-b border-r border-border bg-surface p-6">
              <div className="iso-grid fade-bottom pointer-events-none absolute inset-x-0 top-0 h-48 opacity-0 transition duration-500 group-hover:opacity-100" />
              <IsoGlyph name={f.glyph} className="relative mx-auto -mt-2 w-full max-w-64" />
              <h3 className="relative mt-2 font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Code() {
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Comment ça marche</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">Ajoutez. Utilisez. Modifiez.</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Une commande copie le composant dans votre projet. Ensuite, c&apos;est un template comme les autres : pas de boîte
            noire, pas de mise à jour qui casse.
          </p>
          <ol className="mt-8 space-y-4 text-sm">
            {[
              "Initialisez le thème et les variables",
              "Ajoutez les composants dont vous avez besoin",
              "Utilisez-les dans n'importe quel template",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid size-7 place-items-center rounded-full border border-border font-mono text-xs">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["Django", "Flask", "FastAPI", "Starlette", "Litestar", "Quart", "Sanic"].map((f) => (
              <span key={f} className="rounded-full border border-border px-2.5 py-1">{f}</span>
            ))}
          </div>
        </div>
        <div className="min-w-0 space-y-4">
          <CodeBlock
            lang="bash"
            filename="terminal"
            code={`pip install pyblade-ui
pyblade-ui init --base zinc --color blue
pyblade-ui add card switch button
# ✓ 3 composants copiés dans components/ui`}
          />
          <CodeBlock
            filename="templates/settings.html"
            code={`<pb-ui.card class="max-w-md">
  <pb-ui.card-header>
    <pb-ui.card-title>Notifications</pb-ui.card-title>
  </pb-ui.card-header>
  <pb-ui.card-content class="flex items-center justify-between">
    <pb-ui.label for="emails">Recevoir les emails</pb-ui.label>
    <pb-ui.switch id="emails" name="emails" checked />
  </pb-ui.card-content>
  <pb-ui.card-footer>
    <pb-ui.button variant="outline">Enregistrer</pb-ui.button>
  </pb-ui.card-footer>
</pb-ui.card>`}
          />
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-16">
          <div className="iso-grid fade-radial pointer-events-none absolute inset-0" />
          <div className="relative">
            <IsoGlyph name="compose" className="mx-auto -mt-6 w-56" />
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">Lancez-vous en quelques minutes.</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
              Gratuit et open source. Prenez votre premier composant aujourd&apos;hui.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Lire la documentation
              </Link>
              <CopyCommand command="pyblade-ui init" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <Logo />
        <div className="flex items-center gap-6">
          <Link href="/docs" className="hover:text-foreground">Documentation</Link>
          <Link href="/docs/installation" className="hover:text-foreground">Installation</Link>
          <Link href="/docs/theming" className="hover:text-foreground">Thèmes</Link>
        </div>
        <p>Pour la communauté PyBlade. Open source, licence MIT.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Components />
        <Features />
        <Code />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
