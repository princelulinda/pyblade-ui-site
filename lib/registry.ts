import data from "@/content/registry.json";

export type RegistryFile = { path: string; content: string; props: Record<string, unknown> };
export type Example = { title: string; code: string; height: number; html: string; full?: boolean };
export type RegistryItem = {
  name: string;
  title: string;
  type: string;
  description: string;
  files: RegistryFile[];
  dependencies: string[];
  js: string[];
  python: string[];
  usage: string;
  examples: Example[];
  examples_en?: Example[];
};

export const items = data.items as RegistryItem[];
export const groups = data.groups as { title: string; title_en?: string; items: string[] }[];

/** The landing showcase rendered in other languages, by language then component name. */
export const landingHtml = (data as { landing?: Record<string, Record<string, string>> }).landing ?? {};

/** Every item in sidebar order. */
export const ordered: RegistryItem[] = groups.flatMap((g) => g.items.map((n) => getItem(n)!));

export function getItem(name: string): RegistryItem | undefined {
  return items.find((i) => i.name === name);
}

export const componentCount = items.filter((i) => i.type === "ui").length;
export const blockCount = items.filter((i) => i.type === "block").length;

/** An item's examples in the given language, French when there is no translation. */
export function examplesFor(item: RegistryItem, locale: "fr" | "en"): Example[] {
  return locale === "en" && item.examples_en?.length ? item.examples_en : item.examples;
}
