/* Loads the Hairline kernel (public/hairline/kernel.js) and figures (public/hairline/<name>.js) once per page. */

export type HairlineFigure = {
  name: string;
  means: string;
  rules: number[];
  range: [number, number, number];
  tour: ([number, number] | null)[] | null;
  mount: (
    host: { stage: HTMLElement; svg: SVGSVGElement; read: { textContent: string } },
    value: number,
  ) => { set: (v: number) => void; destroy: () => void };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HL = any;

type HairlineWindow = Window & {
  HL?: HL;
  hairline?: (figure: HairlineFigure) => void;
  __hlFigures?: Record<string, HairlineFigure>;
};

let kernel: Promise<HL> | null = null;
const figures = new Map<string, Promise<HairlineFigure>>();

export function loadKernel(): Promise<HL> {
  if (kernel) return kernel;
  const w = window as HairlineWindow;
  kernel = new Promise((resolve, reject) => {
    w.__hlFigures ??= {};
    w.hairline = (figure) => {
      w.__hlFigures![figure.name] = figure;
      window.dispatchEvent(new CustomEvent("hairline:figure", { detail: figure.name }));
    };
    if (w.HL) return resolve(w.HL);
    const s = document.createElement("script");
    s.src = "/hairline/kernel.js";
    s.onload = () => {
      w.HL.inject(document);
      resolve(w.HL);
    };
    s.onerror = reject;
    document.head.append(s);
  });
  return kernel;
}

export function loadFigure(name: string): Promise<HairlineFigure> {
  const cached = figures.get(name);
  if (cached) return cached;
  const p = loadKernel().then(
    () =>
      new Promise<HairlineFigure>((resolve, reject) => {
        const w = window as HairlineWindow;
        const have = w.__hlFigures?.[name];
        if (have) return resolve(have);
        const on = (e: Event) => {
          if ((e as CustomEvent).detail !== name) return;
          window.removeEventListener("hairline:figure", on);
          resolve(w.__hlFigures![name]);
        };
        window.addEventListener("hairline:figure", on);
        const s = document.createElement("script");
        s.type = "module";
        s.src = `/hairline/${name}.js`;
        s.onerror = reject;
        document.head.append(s);
      }),
  );
  figures.set(name, p);
  return p;
}
