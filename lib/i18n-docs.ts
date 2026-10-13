/** The docs' chrome, in French (/docs) and English (/en/docs). Guide pages keep their own text. */

import type { Locale } from "./i18n";

/** A docs path in the given language: "/docs/cli" or "/en/docs/cli". */
export const docsPath = (locale: Locale, path = "") => `${locale === "en" ? "/en" : ""}/docs${path}`;

const fr = {
  docs: "Docs",
  start: "Démarrer",
  intro: "Introduction",
  installation: "Installation",
  theming: "Thèmes",
  cli: "CLI",
  components: "Composants",
  blocks: "Blocs",
  onThisPage: "Sur cette page",
  menu: "Menu",
  preview: "Aperçu",
  code: "Code",
  copyCode: "Copier le code",
  copied: "Copié",
  manual: "Manuelle",
  usage: "Utilisation",
  examples: "Exemples",
  props: "Props",
  prop: "Prop",
  default: "Défaut",
  dependsOn: "dépend de",
  files: (n: number) => `${n} fichier${n > 1 ? "s" : ""}`,
  installDeps: "Installez les dépendances",
  alpineInHead: "Alpine.js, chargé dans votre",
  and: " et ",
  copyFiles: (n: number) => `Copiez ${n > 1 ? "ces fichiers" : "ce fichier"} dans votre projet`,
  adaptPath: "Adaptez le chemin à votre projet",
  adaptPathBody: ["Le dossier", "components", "est celui déclaré dans", "pyblade.toml", "."],
  tagsAvailable: (n: number): string => (n > 1 ? "Les balises" : "La balise"),
  tagsAvailableEnd: (n: number): string => (n > 1 ? "sont disponibles dans tous vos templates." : "est disponible dans tous vos templates."),
  propsNote: ["Tout autre attribut (", ") est transmis à l'élément racine ; vos classes Tailwind l'emportent sur celles du composant."],
  search: {
    button: "Rechercher…",
    placeholder: "Rechercher un composant ou une page…",
    empty: "Aucun résultat.",
    pages: {
      intro: "Ce qu'est PyBlade UI",
      installation: "Configurer un projet PyBlade",
      theming: "Variables CSS, couleurs et mode sombre",
      cli: "Les commandes pyblade-ui",
    },
  },
};

export type DocsDictionary = typeof fr;

const en: DocsDictionary = {
  docs: "Docs",
  start: "Getting started",
  intro: "Introduction",
  installation: "Installation",
  theming: "Theming",
  cli: "CLI",
  components: "Components",
  blocks: "Blocks",
  onThisPage: "On this page",
  menu: "Menu",
  preview: "Preview",
  code: "Code",
  copyCode: "Copy code",
  copied: "Copied",
  manual: "Manual",
  usage: "Usage",
  examples: "Examples",
  props: "Props",
  prop: "Prop",
  default: "Default",
  dependsOn: "depends on",
  files: (n: number) => `${n} file${n > 1 ? "s" : ""}`,
  installDeps: "Install the dependencies",
  alpineInHead: "Alpine.js, loaded in your",
  and: " and ",
  copyFiles: (n: number) => `Copy ${n > 1 ? "these files" : "this file"} into your project`,
  adaptPath: "Update the path to fit your project",
  adaptPathBody: ["The", "components", "folder is the one set in", "pyblade.toml", "."],
  tagsAvailable: (n: number) => (n > 1 ? "The tags" : "The tag"),
  tagsAvailableEnd: (n: number) => (n > 1 ? "are available in all your templates." : "is available in all your templates."),
  propsNote: ["Any other attribute (", ") is passed to the root element; your Tailwind classes win over the component's."],
  search: {
    button: "Search…",
    placeholder: "Search a component or a page…",
    empty: "No results found.",
    pages: {
      intro: "What PyBlade UI is",
      installation: "Set up a PyBlade project",
      theming: "CSS variables, colors and dark mode",
      cli: "The pyblade-ui commands",
    },
  },
};

export const docsDictionaries: Record<Locale, DocsDictionary> = { fr, en };
