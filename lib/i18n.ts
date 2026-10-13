/** The landing page's words, in French (at /) and English (at /en). */

export type Locale = "fr" | "en";

/** The theme editor (pyblade-themes), in the given language. */
export const THEMES_URL = "https://pyblade-themes-red.vercel.app";
export const themesUrl = (locale: Locale) => `${THEMES_URL}${locale === "en" ? "/en/" : "/"}`;

export const LOCALES: Record<Locale, { label: string; home: string; htmlLang: string }> = {
  fr: { label: "FR", home: "/", htmlLang: "fr" },
  en: { label: "EN", home: "/en", htmlLang: "en" },
};

const fr = {
  meta: {
    title: "PyBlade UI — Des composants pour PyBlade",
    description:
      "Des composants beaux, accessibles et personnalisables pour PyBlade, sur le modèle de shadcn/ui. Copiez-les dans votre projet, le code est à vous.",
  },
  nav: { docs: "Docs", components: "Composants", themes: "Thèmes", cli: "CLI", blocks: "Blocs", search: "Rechercher…", theme: "Changer de thème" },
  copy: { copy: "copier", copied: "copié" },
  hero: {
    badge: "Nouveau",
    news: "Sidebar, data-table, chart et date-picker",
    title1: "Des composants",
    title2: "qu'on prend,",
    title3: "pas qu'on installe.",
    lead: "Des composants beaux et accessibles pour PyBlade, sur le modèle de shadcn/ui. Prenez celui dont vous avez besoin, copiez-le dans vos templates, et faites-en ce que vous voulez.",
    start: "Commencer",
    browse: "Voir les composants",
    figureIdle: "survolez un composant",
    figureHint: "survolez le plateau : chaque composant sort de son emplacement",
  },
  stats: { components: "composants", blocks: "blocs prêts à l'emploi", themes: "thèmes (5 bases × 8 couleurs)", license: "licence open source" },
  showcase: {
    kicker: "Le kit",
    title: "Les vrais composants, en direct.",
    body: "Chaque aperçu est rendu par PyBlade à partir du code que vous copiez. Cliquez, tapez, ouvrez : ils fonctionnent.",
    viewCode: "voir le code →",
    all: (n: number) => `Les ${n} composants`,
  },
  features: {
    kicker: "Pourquoi PyBlade UI",
    title: "Construit comme une bibliothèque. Possédé comme votre code.",
    body: "Tout ce qu'on attend d'un système de composants, sans dépendance à mettre à jour.",
    items: [
      { glyph: "layers", title: "Le code est à vous", body: "Pas une dépendance : chaque composant est copié dans votre dossier components, prêt à être lu, modifié, étendu." },
      { glyph: "tokens", title: "Thèmes en variables CSS", body: "Au format shadcn, en OKLCH, avec un mode clair et un mode sombre. 5 bases × 8 couleurs, et vos propres variables." },
      { glyph: "keys", title: "Accessible par défaut", body: "Navigation au clavier, focus visible et rôles ARIA. Les champs natifs restent natifs et se postent avec le formulaire." },
      { glyph: "template", title: "Pensé pour le serveur", body: "Des composants PyBlade avec props et slots. Erreurs de formulaire avec @error, données Python avec tojson, état du sidebar lu dans un cookie." },
      { glyph: "terminal", title: "Un CLI complet", body: "pyblade-ui ajoute un composant et ses dépendances, montre vos modifications avec diff, et change de thème en une commande." },
      { glyph: "compose", title: "Des blocs prêts à l'emploi", body: "Une application avec sidebar, un formulaire de connexion : assemblés à partir des mêmes composants, à copier et adapter." },
    ],
  },
  how: {
    kicker: "Comment ça marche",
    title: "Ajoutez. Utilisez. Modifiez.",
    body: "Une commande copie le composant dans votre projet. Ensuite, c'est un template comme les autres : pas de boîte noire, pas de mise à jour qui casse.",
    steps: ["Initialisez le thème et les variables", "Ajoutez les composants dont vous avez besoin", "Utilisez-les dans n'importe quel template"],
    terminalDone: "# ✓ 3 composants copiés dans components/ui",
    template: {
      title: "Notifications",
      label: "Recevoir les emails",
      save: "Enregistrer",
    },
  },
  cta: {
    title: "Lancez-vous en quelques minutes.",
    body: "Gratuit et open source. Prenez votre premier composant aujourd'hui.",
    docs: "Lire la documentation",
  },
  editor: {
    kicker: "Éditeur de thèmes",
    title: "Faites-en votre thème.",
    body: "Réglez chaque couleur, le rayon et les ombres, en clair et en sombre, sur les vrais composants. Partez de Vercel, MUI, GitHub, Stripe… puis copiez la commande ou le theme.css.",
    button: "Ouvrir l'éditeur de thèmes",
    footer: "Éditeur de thèmes",
  },
  footer: { docs: "Documentation", install: "Installation", themes: "Thèmes", note: "Pour la communauté PyBlade. Open source, licence MIT." },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "PyBlade UI — Components for PyBlade",
    description:
      "Beautiful, accessible and themable components for PyBlade, in the spirit of shadcn/ui. Copy them into your project and own the code.",
  },
  nav: { docs: "Docs", components: "Components", themes: "Themes", cli: "CLI", blocks: "Blocks", search: "Search…", theme: "Toggle theme" },
  copy: { copy: "copy", copied: "copied" },
  hero: {
    badge: "New",
    news: "Sidebar, data table, chart and date picker",
    title1: "Components",
    title2: "you pick up,",
    title3: "not install.",
    lead: "Beautiful, accessible components for PyBlade, in the spirit of shadcn/ui. Take the one you need, drop it into your templates, and make it yours.",
    start: "Get started",
    browse: "Browse components",
    figureIdle: "hover a component",
    figureHint: "hover the tray: each component lifts out of its pocket",
  },
  stats: { components: "components", blocks: "ready-made blocks", themes: "themes (5 bases × 8 colors)", license: "open source license" },
  showcase: {
    kicker: "The kit",
    title: "The real components, live.",
    body: "Every preview is rendered by PyBlade from the code you copy. Click, type, open: they work.",
    viewCode: "view code →",
    all: (n: number) => `All ${n} components`,
  },
  features: {
    kicker: "Why PyBlade UI",
    title: "Built like a library. Owned like your code.",
    body: "Everything you expect from a component system, without a dependency to keep up with.",
    items: [
      { glyph: "layers", title: "The code is yours", body: "Not a dependency: each component is copied into your components folder, ready to read, edit and extend." },
      { glyph: "tokens", title: "Themes as CSS variables", body: "shadcn-style tokens in OKLCH, with light and dark modes. 5 bases × 8 colors, plus your own variables." },
      { glyph: "keys", title: "Accessible by default", body: "Keyboard navigation, visible focus and ARIA roles. Native fields stay native and post with the form." },
      { glyph: "template", title: "Built for the server", body: "PyBlade components with props and slots. Form errors with @error, Python data with tojson, sidebar state read from a cookie." },
      { glyph: "terminal", title: "A complete CLI", body: "pyblade-ui adds a component and its dependencies, shows your changes with diff, and switches themes in one command." },
      { glyph: "compose", title: "Ready-made blocks", body: "An app shell with a sidebar, a login form: assembled from the same components, ready to copy and adapt." },
    ],
  },
  how: {
    kicker: "How it works",
    title: "Add it. Use it. Change it.",
    body: "One command copies the component into your project. From then on it is a template like any other: no black box, no upgrade that breaks.",
    steps: ["Initialize the theme and tokens", "Add the components you need", "Use them in any template"],
    terminalDone: "# ✓ 3 components copied to components/ui",
    template: {
      title: "Notifications",
      label: "Receive emails",
      save: "Save",
    },
  },
  cta: {
    title: "Start building in minutes.",
    body: "Free and open source. Pick up your first component today.",
    docs: "Read the docs",
  },
  editor: {
    kicker: "Theme editor",
    title: "Make it your theme.",
    body: "Tune every color, the radius and the shadows, in light and dark mode, on the real components. Start from Vercel, MUI, GitHub, Stripe… then copy the command or the theme.css.",
    button: "Open the theme editor",
    footer: "Theme editor",
  },
  footer: { docs: "Documentation", install: "Installation", themes: "Themes", note: "Made for the PyBlade community. Open source, MIT licensed." },
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };
