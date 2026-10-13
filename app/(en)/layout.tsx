import type { Metadata } from "next";
import { dictionaries } from "@/lib/i18n";
import { RootShell } from "../root-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://pyblade-ui.vercel.app"),
  title: dictionaries.en.meta.title,
  description: dictionaries.en.meta.description,
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en" } },
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
