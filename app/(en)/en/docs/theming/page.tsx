import { ThemingPage } from "@/app/components/docs-site/guides";
import { docsDictionaries } from "@/lib/i18n-docs";

export const metadata = { title: `${docsDictionaries.en.theming} — PyBlade UI` };

export default function Page() {
  return <ThemingPage locale="en" />;
}
