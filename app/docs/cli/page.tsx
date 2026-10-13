import { CodeBlock } from "@/app/components/docs/code-block";
import { DocPage, H2, P } from "../doc-page";

export const metadata = { title: "CLI — PyBlade UI" };

const COMMANDS = [
  ["init", "pyblade-ui init --base zinc --color blue --radius 0.625rem", "Configure le projet et génère le thème."],
  ["add", "pyblade-ui add button card\npyblade-ui add --all --dry-run", "Copie des composants avec leurs dépendances. --overwrite remplace vos fichiers modifiés."],
  ["list", "pyblade-ui list", "Liste le registre et indique ce qui est déjà installé."],
  ["diff", "pyblade-ui diff button", "Montre vos modifications par rapport au registre, avant une mise à jour."],
  ["theme", "pyblade-ui theme list\npyblade-ui theme show\npyblade-ui theme set --color rose", "Gère le thème."],
];

export default function Cli() {
  return (
    <DocPage
      crumbs={["Docs", "CLI"]}
      title="CLI"
      description="La commande pyblade-ui ajoute, compare et met à jour les composants de votre projet."
      toc={COMMANDS.map(([c]) => ({ id: c, label: c }))}
      prev={{ href: "/docs/theming", label: "Thèmes" }}
      next={{ href: "/docs/components/button", label: "Button" }}
    >
      {COMMANDS.map(([c, code, d]) => (
        <div key={c} className="space-y-3">
          <H2 id={c}>{c}</H2>
          <P>{d}</P>
          <CodeBlock lang="bash" code={code} />
        </div>
      ))}
    </DocPage>
  );
}
