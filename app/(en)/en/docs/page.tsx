import { IntroPage } from "@/app/components/docs-site/guides";
import { docsDictionaries } from "@/lib/i18n-docs";

export const metadata = { title: `${docsDictionaries.en.intro} — PyBlade UI` };

export default function Page() {
  return <IntroPage locale="en" />;
}
