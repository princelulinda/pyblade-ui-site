"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavSection = { title: string; links: { href: string; label: string }[] };

export function Sidebar({ sections }: { sections: NavSection[] }) {
  const path = usePathname();
  return (
    <nav className="space-y-7 text-sm">
      {sections.map((s) => (
        <div key={s.title}>
          <div className="mb-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{s.title}</div>
          <ul className="space-y-0.5">
            {s.links.map((l) => {
              const active = path === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`block rounded-md px-2 py-1.5 transition ${active ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
