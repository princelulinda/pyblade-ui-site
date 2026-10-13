import { CodeBlock } from "@/app/components/docs/code-block";
import { DocPage, H2, P } from "../doc-page";

export const metadata = { title: "Installation — PyBlade UI" };

export default function Installation() {
  return (
    <DocPage
      crumbs={["Docs", "Installation"]}
      title="Installation"
      description="Configurer PyBlade UI dans un projet PyBlade existant."
      toc={[
        { id: "prerequis", label: "Prérequis" },
        { id: "init", label: "Initialiser" },
        { id: "framework", label: "Brancher le framework" },
        { id: "head", label: "Le <head>" },
        { id: "ajouter", label: "Ajouter des composants" },
      ]}
      prev={{ href: "/docs", label: "Introduction" }}
      next={{ href: "/docs/theming", label: "Thèmes" }}
    >
      <H2 id="prerequis">Prérequis</H2>
      <P>
        Python 3.11 ou plus récent, PyBlade 0.3 ou plus récent et Tailwind CSS v4. Les composants interactifs ont aussi
        besoin d&apos;Alpine.js.
      </P>

      <H2 id="init">Initialiser</H2>
      <CodeBlock lang="bash" code={`pip install pyblade-ui\ncd mon-projet-pyblade\npyblade-ui init --base zinc --color blue`} />
      <P>
        <code>init</code> écrit <code>pyblade-ui.toml</code>, génère <code>static/css/theme.css</code>, ajoute{" "}
        <code>@import &quot;./theme.css&quot;;</code> dans <code>static/css/tailwind.css</code>, puis installe{" "}
        <code>theme-script</code> et <code>mode-toggle</code>.
      </P>

      <H2 id="framework">Brancher le framework</H2>
      <CodeBlock
        lang="python"
        code={`# Django : settings.py
INSTALLED_APPS = [..., "pyblade_ui"]

# Flask, FastAPI… : une fois au démarrage
import pyblade_ui`}
      />

      <H2 id="head">Le &lt;head&gt;</H2>
      <CodeBlock
        filename="templates/layout.html"
        code={`<head>
  <pb-ui.theme-script />
  <link rel="stylesheet" href="@static('css/app.css')" />
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.9/dist/cdn.min.js"></script>
</head>`}
      />
      <P>Adaptez le chemin de la feuille de style compilée (<code>@static</code>) à votre framework.</P>

      <H2 id="ajouter">Ajouter des composants</H2>
      <CodeBlock lang="bash" code={`pyblade-ui add button card dialog\n# ou tout d'un coup\npyblade-ui add --all`} />
      <P>
        Les dépendances sont copiées avec : <code>dialog</code> installe aussi <code>button</code>. <code>add</code> ne remplace
        jamais un fichier que vous avez modifié, sauf avec <code>--overwrite</code>.
      </P>
    </DocPage>
  );
}
