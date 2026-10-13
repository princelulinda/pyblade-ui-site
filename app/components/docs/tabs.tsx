"use client";

import { useState, type ReactNode } from "react";

/** Underlined tabs, shadcn docs style. */
export function DocTabs({ tabs, right }: { tabs: { label: string; content: ReactNode }[]; right?: ReactNode }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-between border-b border-border">
        <div className="flex gap-5" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`-mb-px border-b-2 pb-2.5 pt-1 text-sm font-medium transition ${i === active ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {right}
      </div>
      <div className="pt-4">
        {tabs.map((t, i) => (
          <div key={t.label} hidden={i !== active}>
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
