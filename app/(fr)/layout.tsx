import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n";
import { RootShell } from "../root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://pyblade-ui.vercel.app"),
  title: dictionaries.fr.meta.title,
  description: dictionaries.fr.meta.description,
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
};

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="fr">{children}</RootShell>;
}
