"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

/** The same page in the other language: "/docs/cli" ↔ "/en/docs/cli", "/" ↔ "/en". */
function counterpart(path: string, to: Locale) {
  const bare = path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
  return to === "en" ? (bare === "/" ? "/en" : `/en${bare}`) : bare;
}

export function LangSwitch({ locale }: { locale: Locale }) {
  const path = usePathname() || "/";
  return (
    <div className="flex h-9 items-center rounded-lg border border-border p-0.5 text-xs font-medium" role="group" aria-label="Language">
      {(Object.keys(LOCALES) as Locale[]).map((l) => (
        <Link
          key={l}
          href={counterpart(path, l)}
          hrefLang={LOCALES[l].htmlLang}
          aria-current={l === locale ? "page" : undefined}
          className={`grid h-full place-items-center rounded-md px-2 transition ${l === locale ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {LOCALES[l].label}
        </Link>
      ))}
    </div>
  );
}
