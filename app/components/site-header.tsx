import Link from "next/link";
import { ordered } from "@/lib/registry";
import { SearchButton } from "./search";
import { ThemeToggle } from "./ui";

const NAV = [
  { label: "Docs", href: "/docs" },
  { label: "Composants", href: "/docs/components/button" },
  { label: "Thèmes", href: "/docs/theming" },
  { label: "CLI", href: "/docs/cli" },
  { label: "Blocs", href: "/docs/components/login-form" },
];

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <svg viewBox="0 0 32 32" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
        <path d="M16 4.5l10.5 5.25v12.5L16 27.5 5.5 22.25V9.75z" className="opacity-40" />
        <path d="M5.5 9.75L16 15l10.5-5.25M16 15v12.5" className="opacity-40" />
        <path d="M16 9l5 2.5-5 2.5-5-2.5z" />
      </svg>
      <span>
        PyBlade<span className="text-muted-foreground">/ui</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ wide = false }: { wide?: boolean }) {
  const entries = ordered.map((i) => ({ name: i.name, title: i.title, description: i.description }));
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className={`mx-auto flex h-16 items-center gap-8 px-4 sm:px-6 ${wide ? "max-w-[1400px]" : "max-w-7xl"}`}>
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="transition hover:text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchButton entries={entries} />
          <a
            href="https://github.com/princelulinda/pyblade-ui"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
            </svg>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
