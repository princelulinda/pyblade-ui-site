import { CliPage } from "@/app/components/docs-site/guides";
import { docsDictionaries } from "@/lib/i18n-docs";

export const metadata = { title: `${docsDictionaries.en.cli} — PyBlade UI` };

export default function Page() {
  return <CliPage locale="en" />;
}
