import { SiteHeader } from "@/app/components/site-header";
import { getItem, groups } from "@/lib/registry";
import { Sidebar, type NavSection } from "./sidebar";

const sections: NavSection[] = [
  {
    title: "Démarrer",
    links: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/theming", label: "Thèmes" },
      { href: "/docs/cli", label: "CLI" },
    ],
  },
  ...groups.map((g) => ({
    title: g.title,
    links: g.items.map((n) => ({ href: `/docs/components/${n}`, label: getItem(n)!.title })),
  })),
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader wide />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 px-4 sm:px-6">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-border py-8 pr-4 md:block">
          <Sidebar sections={sections} />
        </aside>
        <div className="min-w-0 flex-1">
          <details className="group border-b border-border py-3 md:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              Menu
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
