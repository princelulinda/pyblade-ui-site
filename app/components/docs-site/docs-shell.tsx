import { SiteHeader } from "@/app/components/site-header";
import type { Locale } from "@/lib/i18n";
import { docsDictionaries, docsPath } from "@/lib/i18n-docs";
import { getItem, groups } from "@/lib/registry";
import { Sidebar, type NavSection } from "./sidebar";

function sectionsFor(locale: Locale): NavSection[] {
  const t = docsDictionaries[locale];
  return [
    {
      title: t.start,
      links: [
        { href: docsPath(locale), label: t.intro },
        { href: docsPath(locale, "/installation"), label: t.installation },
        { href: docsPath(locale, "/theming"), label: t.theming },
        { href: docsPath(locale, "/cli"), label: t.cli },
      ],
    },
    ...groups.map((g) => ({
      title: locale === "en" ? g.title_en ?? g.title : g.title,
      links: g.items.map((n) => ({ href: docsPath(locale, `/components/${n}`), label: getItem(n)!.title })),
    })),
  ];
}

/** The docs' frame: header, sidebar (a menu on small screens) and the page. */
export function DocsShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const sections = sectionsFor(locale);
  return (
    <>
      <SiteHeader wide locale={locale} />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-4 sm:px-6">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-8 pr-4 md:block">
          <Sidebar sections={sections} />
        </aside>
        <div className="min-w-0 flex-1">
          <details className="group border-b border-border py-3 md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              {docsDictionaries[locale].menu}
              <span className="text-muted-foreground transition group-open:rotate-180">⌄</span>
            </summary>
            <div className="pt-4">
              <Sidebar sections={sections} />
            </div>
          </details>
          {children}
        </div>
      </div>
    </>
  );
}
