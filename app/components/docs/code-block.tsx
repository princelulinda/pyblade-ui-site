import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

/** A highlighted snippet with a copy button, and its file name when it has one. */
export async function CodeBlock({
  code,
  lang = "html",
  filename,
  className = "",
  flush = false,
  copyLabel,
}: {
  code: string;
  lang?: "html" | "bash" | "css" | "python";
  filename?: string;
  className?: string;
  flush?: boolean;
  copyLabel?: string;
}) {
  const html = await highlight(code, lang);
  return (
    <div className={`group relative overflow-hidden bg-muted/40 ${flush ? "" : "rounded-xl border border-border"} ${className}`}>
      {filename && (
        <div className="flex h-10 items-center justify-between border-b border-border px-4 font-mono text-xs text-muted-foreground">
          <span className="truncate">{filename}</span>
          <CopyButton text={code} label={copyLabel} />
        </div>
      )}
      {!filename && <CopyButton text={code} label={copyLabel} className="absolute right-2.5 top-2.5 z-10 bg-background/80 backdrop-blur" />}
      <div
        className="code max-h-[480px] overflow-auto px-4 py-3.5 text-[13px] leading-6"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
