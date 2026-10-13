import Link from "next/link";
import { PreviewFrame } from "@/app/components/docs/preview-frame";
import { getItem } from "@/lib/registry";

/** Real components, rendered by PyBlade at build time, as on their docs pages. */
const TILES = [
  { name: "card", example: "Aperçu", className: "lg:col-span-2 lg:row-span-2" },
  { name: "calendar", example: "Aperçu", className: "lg:row-span-2" },
  { name: "combobox", example: "Aperçu" },
  { name: "button", example: "Variantes" },
  { name: "chart", example: "Barres", className: "lg:col-span-2" },
  { name: "tabs", example: "Aperçu" },
  { name: "input-otp", example: "Aperçu" },
  { name: "alert", example: "Variantes", className: "lg:col-span-2" },
  { name: "toggle-group", example: "Choix unique, outline" },
  { name: "badge", example: "Variantes" },
];

export function Showcase() {
  return (
    <div className="grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {TILES.map((t) => {
        const item = getItem(t.name);
        const example = item?.examples.find((e) => e.title === t.example) ?? item?.examples[0];
        if (!item || !example) return null;
        return (
          <div key={t.name} className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-ring ${t.className ?? ""}`}>
            <div className="flex items-center justify-between px-4 pt-3 font-mono text-[11px] text-muted-foreground">
              <span>{`<pb-ui.${t.name}>`}</span>
              <Link href={`/docs/components/${t.name}`} className="opacity-0 transition hover:text-foreground group-hover:opacity-100">
                voir le code →
              </Link>
            </div>
            <div className="relative min-h-0 flex-1">
              <div className="absolute inset-0">
                <PreviewFrame html={example.html} height="100%" title={item.title} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
