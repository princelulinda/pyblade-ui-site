import Link from "next/link";
import { CodeBlock } from "@/app/components/docs/code-block";
import { dictionaries, themesUrl, type Locale } from "@/lib/i18n";
import { docsPath } from "@/lib/i18n-docs";
import { blockCount, componentCount } from "@/lib/registry";
import { IsoGlyph } from "./iso-glyph";
import { Showcase } from "./showcase";
import { Logo, SiteHeader } from "./site-header";
import { CopyCommand, HeroFigure } from "./ui";

/** The landing page, in one language; it links to the docs in the same language. */
export function Landing({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <Hero locale={locale} />
        <Stats locale={locale} />
        <Components locale={locale} />
        <ThemeEditor locale={locale} />
        <Features locale={locale} />
        <Code locale={locale} />
        <CallToAction locale={locale} />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo href={locale === "en" ? "/en" : "/"} />
          <div className="flex items-center gap-6">
            <Link href={docsPath(locale)} className="hover:text-foreground">{t.footer.docs}</Link>
            <Link href={docsPath(locale, "/installation")} className="hover:text-foreground">{t.footer.install}</Link>
            <Link href={docsPath(locale, "/theming")} className="hover:text-foreground">{t.footer.themes}</Link>
            <a href={themesUrl(locale)} className="hover:text-foreground">{t.editor.footer}</a>
          </div>
          <p>{t.footer.note}</p>
        </div>
      </footer>
    </>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="iso-grid fade-radial pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <Link
            href={docsPath(locale, "/components/sidebar")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 py-1 pl-1 pr-3 text-xs text-muted-foreground backdrop-blur transition hover:border-ring hover:text-foreground"
          >
            <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground">{t.hero.badge}</span>
            {t.hero.news}
            <span aria-hidden>→</span>
          </Link>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {t.hero.title1}
            <br />
            {t.hero.title2} <span className="text-muted-foreground">{t.hero.title3}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{t.hero.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={docsPath(locale)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {t.hero.start}
              <span aria-hidden>→</span>
            </Link>
            <a
              href="#components"
              className="inline-flex h-11 items-center rounded-xl border border-border bg-surface/80 px-5 text-sm font-medium backdrop-blur transition hover:bg-muted"
            >
              {t.hero.browse}
            </a>
          </div>
          <div className="mt-6">
            <CopyCommand command="pip install pyblade-ui" labels={t.copy} />
          </div>
        </div>

        <div className="relative">
          <div className="relative rounded-[28px] border border-border bg-surface/60 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] backdrop-blur">
            <div className="rounded-[22px] border border-border bg-surface">
              <HeroFigure idle={t.hero.figureIdle} />
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">{t.hero.figureHint}</p>
        </div>
      </div>
    </section>
  );
}

function Stats({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].stats;
  const stats = [
    [String(componentCount), t.components],
    [String(blockCount), t.blocks],
    ["40", t.themes],
    ["MIT", t.license],
  ];
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 md:grid-cols-4">
        {stats.map(([n, l], i) => (
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

function Components({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].showcase;
  return (
    <section id="components" className="relative scroll-mt-16 border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <div className="mt-14">
          <Showcase locale={locale} viewCode={t.viewCode} />
        </div>
        <div className="mt-10 text-center">
          <Link
            href={docsPath(locale, "/components/button")}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border px-5 text-sm font-medium transition hover:bg-muted"
          >
            {t.all(componentCount)} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ThemeEditor({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].editor;
  const swatches = ["#171717", "#1976d2", "#1d9bf0", "#1f883d", "#5e6ad2", "#635bff", "#e11d48", "#f59e0b"];
  return (
    <section className="border-b border-border py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative grid items-center gap-10 overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="iso-grid fade-radial pointer-events-none absolute inset-0" />
          <div className="relative">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.kicker}</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{t.title}</h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">{t.body}</p>
            <a
              href={themesUrl(locale)}
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              {t.button} <span aria-hidden>↗</span>
            </a>
          </div>
          <a href={themesUrl(locale)} className="relative grid grid-cols-4 gap-3" aria-hidden tabIndex={-1}>
            {swatches.map((c, i) => (
              <div
                key={c}
                className="aspect-square rounded-2xl border border-border shadow-sm transition duration-300 hover:-translate-y-1"
                style={{ background: c, borderRadius: `${0.25 + (i % 4) * 0.35}rem` }}
              />
            ))}
          </a>
        </div>
      </div>
    </section>
  );
}

function Features({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].features;
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead kicker={t.kicker} title={t.title} body={t.body} />
        <div className="mt-14 grid overflow-hidden rounded-2xl border border-border sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((f) => (
            <div key={f.title} className="group relative -mb-px -mr-px border-b border-r border-border bg-surface p-6">
              <div className="iso-grid fade-bottom pointer-events-none absolute inset-x-0 top-0 h-48 opacity-0 transition duration-500 group-hover:opacity-100" />
              <IsoGlyph name={f.glyph as "layers"} className="relative mx-auto -mt-2 w-full max-w-64" />
              <h3 className="relative mt-2 font-semibold">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Code({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].how;
  return (
    <section className="border-b border-border py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="min-w-0">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.kicker}</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">{t.body}</p>
          <ol className="mt-8 space-y-4 text-sm">
            {t.steps.map((s, i) => (
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
${t.terminalDone}`}
          />
          <CodeBlock
            filename="templates/settings.html"
            code={`<pb-ui.card class="max-w-md">
  <pb-ui.card-header>
    <pb-ui.card-title>${t.template.title}</pb-ui.card-title>
  </pb-ui.card-header>
  <pb-ui.card-content class="flex items-center justify-between">
    <pb-ui.label for="emails">${t.template.label}</pb-ui.label>
    <pb-ui.switch id="emails" name="emails" checked />
  </pb-ui.card-content>
  <pb-ui.card-footer>
    <pb-ui.button variant="outline">${t.template.save}</pb-ui.button>
  </pb-ui.card-footer>
</pb-ui.card>`}
          />
        </div>
      </div>
    </section>
  );
}

function CallToAction({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center sm:px-16">
          <div className="iso-grid fade-radial pointer-events-none absolute inset-0" />
          <div className="relative">
            <IsoGlyph name="compose" className="mx-auto -mt-6 w-56" />
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.cta.title}</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">{t.cta.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={docsPath(locale)}
                className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                {t.cta.docs}
              </Link>
              <CopyCommand command="pyblade-ui init" labels={t.copy} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
