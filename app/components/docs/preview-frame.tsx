"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// The preview document: the component's rendered HTML with its own theme, Tailwind build and Alpine.
// It follows the docs' light or dark mode by watching the parent page's data-theme.
const head = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="/preview/preview.css">
<script>(function(){var p=null;try{p=parent.document.documentElement}catch(e){}
function apply(){var d=p?p.dataset.theme==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}
apply();if(p)new MutationObserver(apply).observe(p,{attributes:true,attributeFilter:["data-theme"]});})()</script>
<script defer src="/preview/alpine.min.js"></script>
<style>html,body{min-height:100%;height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;padding:2.5rem 1.5rem;box-sizing:border-box;font-family:ui-sans-serif,system-ui,sans-serif;-webkit-font-smoothing:antialiased}</style>
</head><body>`;

// A whole-page example is laid out at a desktop width, then scaled down to fit the column.
const DESKTOP = 1200;

export function PreviewFrame({ html, height, title, full = false }: { html: string; height: number | string; title: string; full?: boolean }) {
  const doc = useMemo(
    () => `${head}${full ? "<style>body{display:block;padding:0}</style>" : ""}${html}</body></html>`,
    [html, full],
  );
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!full || !box.current) return;
    const el = box.current;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / DESKTOP)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [full]);

  if (!full) {
    return <iframe title={title} srcDoc={doc} className="block w-full border-0 bg-transparent" style={{ height }} loading="lazy" />;
  }
  const width = scale < 1 ? DESKTOP : "100%";
  return (
    <div ref={box} className="relative w-full overflow-hidden" style={{ height: typeof height === "number" ? height * scale : height }}>
      <iframe
        title={title}
        srcDoc={doc}
        className="absolute left-0 top-0 block origin-top-left border-0 bg-transparent"
        style={{ width, height, transform: `scale(${scale})` }}
        loading="lazy"
      />
    </div>
  );
}
