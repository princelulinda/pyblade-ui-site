"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Entry = { href: string; title: string; description: string };

/** ⌘K: jump to any docs page or component. */
export function SearchButton({
  entries,
  label = "Rechercher…",
  placeholder = "Rechercher un composant ou une page…",
  empty = "Aucun résultat.",
}: {
  entries: Entry[];
  label?: string;
  placeholder?: string;
  empty?: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const found = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? entries.filter((e) => e.title.toLowerCase().includes(s) || e.href.includes(s)) : entries;
  }, [q, entries]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (open) setTimeout(() => input.current?.focus(), 0);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setQ("");
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden h-9 w-56 items-center justify-between rounded-lg border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition hover:border-ring lg:flex"
      >
        {label}
        <kbd className="rounded border border-border bg-surface px-1.5 font-mono text-[10px]">⌘K</kbd>
      </button>
      {open && createPortal(
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-label="Recherche"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={input}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
                if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, found.length - 1)); }
                if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
                if (e.key === "Enter" && found[sel]) go(found[sel].href);
              }}
              placeholder={placeholder}
              className="h-12 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
            />
            <ul className="max-h-80 overflow-auto p-2">
              {found.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted-foreground">{empty}</li>}
              {found.map((e, i) => (
                <li key={e.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setSel(i)}
                    onClick={() => go(e.href)}
                    className={`flex w-full flex-col items-start rounded-lg px-3 py-2 text-left text-sm ${i === sel ? "bg-muted" : ""}`}
                  >
                    <span className="font-medium">{e.title}</span>
                    <span className="text-xs text-muted-foreground">{e.description}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
