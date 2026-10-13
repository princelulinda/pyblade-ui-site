import { InstallationPage } from "@/app/components/docs-site/guides";
import { docsDictionaries } from "@/lib/i18n-docs";

export const metadata = { title: `${docsDictionaries.fr.installation} — PyBlade UI` };

export default function Page() {
  return <InstallationPage locale="fr" />;
}
