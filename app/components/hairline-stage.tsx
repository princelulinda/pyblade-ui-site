"use client";

import { useEffect, useRef, useState } from "react";
import { loadFigure } from "./hairline";

/** Mounts a Hairline figure the way the package does; with `autoplay`, its tour walks it until a hand arrives. */
export function HairlineStage({
  name,
  autoplay = false,
  className = "",
  onRead,
}: {
  name: string;
  autoplay?: boolean;
  className?: string;
  onRead?: (text: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const readRef = useRef(onRead);
  useEffect(() => {
    readRef.current = onRead;
  }, [onRead]);

  useEffect(() => {
    let alive = true;
    let cleanup = () => {};
    loadFigure(name)
      .then((fig) => {
        const stage = ref.current;
        if (!alive || !stage) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const HL = (window as any).HL;
        stage.setAttribute("data-hairline", fig.name);
        stage.setAttribute("role", "img");
        stage.setAttribute("aria-label", fig.means);
        const svg = HL.mk("svg", { viewBox: "0 0 400 320", "aria-hidden": "true" }, stage);
        let text = "";
        const read = {
          get textContent() {
            return text;
          },
          set textContent(v: string) {
            text = v == null ? "" : String(v);
            readRef.current?.(text);
          },
        };
        const handle = fig.mount({ stage, svg, read }, fig.range[1]);
        if (!text) read.textContent = "rest";
        const tour = autoplay ? HL.tour(stage, fig.tour || HL.LAP) : null;
        cleanup = () => {
          tour?.stop();
          handle.destroy();
          svg.remove();
        };
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
      cleanup();
    };
  }, [name, autoplay]);

  return <div ref={ref} className={className} data-failed={failed || undefined} />;
}
