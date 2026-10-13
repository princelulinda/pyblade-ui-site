import Link from "next/link";
import type { ReactNode } from "react";

export type TocEntry = { id: string; label: string; depth?: number };

export const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** The column a docs page is written in, with its table of contents on the right. */
export function DocPage({
  crumbs,
  title,
  description,
  toc = [],
  badges,
  children,
  prev,
  next,
}: {
  crumbs: string[];
  title: string;
  description?: string;
  toc?: TocEntry[];
  badges?: ReactNode;
  children: ReactNode;
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
}) {
  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1 py-8 md:px-4 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={c} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>›</span>}
                <span className={i === crumbs.length - 1 ? "text-foreground" : ""}>{c}</span>
              </span>
            ))}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em]">{title}</h1>
          {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
          {badges && <div className="mt-4 flex flex-wrap gap-2">{badges}</div>}
          <div className="mt-8 space-y-6">{children}</div>
          {(prev || next) && (
            <div className="mt-16 flex justify-between gap-4 border-t border-border pt-6 text-sm">
              {prev ? (
                <Link href={prev.href} className="rounded-lg border border-border px-4 py-2.5 transition hover:bg-muted">
                  <span className="text-muted-foreground">‹</span> {prev.label}
                </Link>
              ) : <span />}
              {next && (
                <Link href={next.href} className="rounded-lg border border-border px-4 py-2.5 transition hover:bg-muted">
                  {next.label} <span className="text-muted-foreground">›</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </article>
      {toc.length > 0 && (
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-52 shrink-0 overflow-y-auto py-10 xl:block">
          <div className="mb-3 text-sm font-medium">Sur cette page</div>
          <ul className="space-y-2 text-sm">
            {toc.map((t) => (
              <li key={t.id} className={t.depth === 2 ? "pl-3" : ""}>
                <a href={`#${t.id}`} className="text-muted-foreground transition hover:text-foreground">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 border-b border-border pb-2 pt-6 text-2xl font-semibold tracking-tight">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-24 pt-4 text-lg font-semibold tracking-tight">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="leading-7 text-muted-foreground [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-foreground">{children}</p>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-md border border-border bg-muted/50 px-2 py-0.5 font-mono text-xs text-muted-foreground">{children}</span>;
}
