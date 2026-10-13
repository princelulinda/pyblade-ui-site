"use client";

import { useEffect, useRef } from "react";
import { loadKernel, type HL } from "./hairline";

/**
 * Small still drawings in the Hairline style, built with the kernel: rounded
 * solids (a silhouette and one crease), flat marks on their tops, and one
 * bright edge. Parts are listed back to front, which is the paint order.
 */
type Part = {
  b: [number, number, number, number, number]; // x0, y0, x1, y1, corner radius
  z: [number, number];
  hi?: boolean;
  marks?: [number, number, number][][];
  dim?: [number, number, number][][];
};

const line = (x0: number, y0: number, x1: number, y1: number, z: number): [number, number, number][] => [
  [x0, y0, z],
  [x1, y1, z],
];

export const GLYPHS: Record<string, { parts: Part[] }> = {
  // three sheets lifted off a stack: copy the source, it is yours
  layers: {
    parts: [
      { b: [0, 0, 56, 40, 6], z: [0, 3], dim: [line(8, 10, 40, 10, 3)] },
      { b: [0, 0, 56, 40, 6], z: [14, 17], dim: [line(8, 10, 34, 10, 17), line(8, 18, 44, 18, 17)] },
      { b: [0, 0, 56, 40, 6], z: [28, 31], hi: true, marks: [line(8, 10, 30, 10, 31)], dim: [line(8, 18, 46, 18, 31), line(8, 25, 38, 25, 31)] },
    ],
  },
  // a scale of tokens, swatches stepping up
  tokens: {
    parts: [
      { b: [0, 0, 18, 18, 9], z: [0, 6] },
      { b: [0, 22, 18, 40, 9], z: [0, 14] },
      { b: [22, 0, 40, 18, 9], z: [0, 22] },
      { b: [22, 22, 40, 40, 9], z: [0, 32], hi: true },
    ],
  },
  // keys: one held down, focus you can feel
  keys: {
    parts: [
      { b: [0, 0, 20, 20, 4], z: [0, 9], dim: [line(6, 10, 14, 10, 9)] },
      { b: [24, 0, 44, 20, 4], z: [0, 9] },
      { b: [0, 24, 20, 44, 4], z: [0, 9] },
      { b: [24, 24, 44, 44, 4], z: [0, 4], hi: true, marks: [line(29, 34, 39, 34, 4)] },
    ],
  },
  // a template file: indented lines, one of them a component
  template: {
    parts: [
      {
        b: [0, 0, 44, 58, 5],
        z: [0, 5],
        dim: [line(7, 9, 22, 9, 5), line(13, 17, 34, 17, 5), line(13, 33, 30, 33, 5), line(7, 49, 20, 49, 5)],
      },
      { b: [10, 21, 38, 29, 3], z: [5, 10], hi: true, marks: [line(15, 25, 27, 25, 10)] },
    ],
  },
  // a terminal: one command adds a part
  terminal: {
    parts: [
      {
        b: [0, 0, 60, 42, 6],
        z: [0, 6],
        marks: [line(0, 10, 60, 10, 6)],
        dim: [line(10, 20, 16, 23, 6), line(16, 23, 10, 26, 6), line(20, 26, 40, 26, 6), line(10, 33, 30, 33, 6)],
      },
      { b: [6, 3, 10, 7, 2], z: [6, 8], hi: true },
      { b: [13, 3, 17, 7, 2], z: [6, 8] },
    ],
  },
  // a bento of blocks that snap into one layout
  compose: {
    parts: [
      { b: [0, 0, 26, 26, 5], z: [0, 8] },
      { b: [30, 0, 56, 12, 4], z: [0, 16] },
      { b: [30, 16, 56, 26, 4], z: [0, 5] },
      { b: [0, 30, 12, 56, 4], z: [0, 12] },
      { b: [16, 30, 56, 56, 5], z: [0, 20], hi: true, dim: [line(24, 38, 46, 38, 20), line(24, 45, 40, 45, 20)] },
    ],
  },
};

function draw(HL: HL, svg: SVGSVGElement, spec: { parts: Part[] }) {
  const { Cam, fit, proj, facing, rings, prism, put, solid, open, mk } = HL;
  const pts: number[][] = [];
  for (const p of spec.parts) {
    const [x0, y0, x1, y1] = p.b;
    for (const [x, y] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) pts.push([x, y, p.z[0]], [x, y, p.z[1]]);
  }
  // scale to fill the frame the same way for every glyph
  const P1 = proj(Cam(45, 0.5, 1));
  const sp = pts.map(([x, y, z]) => P1(x, y, z));
  const w = Math.max(...sp.map((q: number[]) => q[0])) - Math.min(...sp.map((q: number[]) => q[0]));
  const h = Math.max(...sp.map((q: number[]) => q[1])) - Math.min(...sp.map((q: number[]) => q[1]));
  const C = Cam(45, 0.5, Math.min(250 / w, 190 / h));
  fit(C, pts, 200, 160);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);
  const flat = (pl: [number, number, number][]) => open(pl.map(([x, y, z]) => P(x, y, z)));
  for (const p of spec.parts) {
    const [x0, y0, x1, y1, r] = p.b;
    const b = Math.min(1.2, Math.min(x1 - x0, y1 - y0) / 2 - 0.6);
    const [ring, inner] = rings(x0, y0, x1, y1, r, b);
    const s = solid(g);
    put(s, prism(P, front, ring, inner, p.z[0], p.z[1]));
    if (p.hi) s.sil.classList.add("hi");
    if (p.dim) mk("path", { d: p.dim.map(flat).join(""), class: "nf lo" }, g);
    if (p.marks) mk("path", { d: p.marks.map(flat).join(""), class: "nf" }, g);
  }
}

export function IsoGlyph({ name, className = "" }: { name: keyof typeof GLYPHS; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let svg: SVGSVGElement | null = null;
    let alive = true;
    loadKernel().then((HL) => {
      const host = ref.current;
      if (!alive || !host) return;
      host.setAttribute("data-hairline", "glyph");
      svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, host) as SVGSVGElement;
      draw(HL, svg, GLYPHS[name]);
    });
    return () => {
      alive = false;
      svg?.remove();
    };
  }, [name]);
  return <div ref={ref} aria-hidden="true" className={`aspect-[5/4] ${className}`} />;
}
