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
};

export const items = data.items as RegistryItem[];
export const groups = data.groups as { title: string; items: string[] }[];

/** Every item in sidebar order. */
export const ordered: RegistryItem[] = groups.flatMap((g) => g.items.map((n) => getItem(n)!));

export function getItem(name: string): RegistryItem | undefined {
  return items.find((i) => i.name === name);
}

export const componentCount = items.filter((i) => i.type === "ui").length;
export const blockCount = items.filter((i) => i.type === "block").length;
