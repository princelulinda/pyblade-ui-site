import { DocsShell } from "@/app/components/docs-site/docs-shell";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell locale="fr">{children}</DocsShell>;
}
