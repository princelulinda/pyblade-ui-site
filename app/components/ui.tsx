"use client";

import { useState } from "react";
import { HairlineStage } from "./hairline-stage";

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Changer de thème"
      className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" className="dark:hidden" />
        <path d="M12 7.5a4.5 4.5 0 0 0 0 9z" fill="currentColor" className="hidden dark:block" />
      </svg>
    </button>
  );
}

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-11 items-center gap-3 rounded-xl border border-border bg-surface/80 px-4 font-mono text-sm text-muted-foreground backdrop-blur transition hover:border-ring hover:text-foreground"
    >
      <span className="text-muted-foreground/60">$</span>
      <span className="text-foreground">{command}</span>
      <span className="ml-1 text-xs text-muted-foreground transition group-hover:text-foreground">
        {copied ? "copié" : "copier"}
      </span>
    </button>
  );
}

// The figure names its parts; the library names some of them differently.
const TAGS: Record<string, string> = { radio: "radio-group" };

/** The hero's figure, with its read-out in the plate's corner. */
export function HeroFigure() {
  const [read, setRead] = useState("rest");
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-foreground" />
        kit
      </div>
      <div className="absolute right-4 top-4 z-10 rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] tabular-nums text-foreground">
        {read === "rest" ? "survolez un composant" : `<pb-ui.${TAGS[read] ?? read} />`}
      </div>
      {/* the stage is drawn 25% larger and cropped, so the tray fills the plate */}
      <div className="aspect-[5/4] w-full overflow-hidden rounded-[22px]">
        <HairlineStage name="kit" autoplay onRead={setRead} className="-ml-[12.5%] -mt-[10%] aspect-[5/4] w-[125%]" />
      </div>
    </div>
  );
}
