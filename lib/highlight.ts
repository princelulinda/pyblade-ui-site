import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Promise<Highlighter> | null = null;

/** Highlighted HTML for a snippet, with light and dark colours as CSS variables. */
export async function highlight(code: string, lang: "html" | "bash" | "css" | "python" = "html") {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark-default"], langs: ["html", "bash", "css", "python"] });
  const h = await highlighter;
  return h.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-default" },
    defaultColor: false,
  });
}
