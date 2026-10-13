import type { Example } from "@/lib/registry";
import { CodeBlock } from "./code-block";
import { PreviewFrame } from "./preview-frame";
import { DocTabs } from "./tabs";

/** A live preview of an example, rendered by PyBlade, with its source one tab away. */
export function ComponentPreview({ example, name }: { example: Example; name: string }) {
  return (
    <DocTabs
      tabs={[
        {
          label: "Aperçu",
          content: (
            <div className="iso-dots overflow-hidden rounded-xl border border-border">
              <PreviewFrame html={example.html} height={example.height} full={example.full} title={`${name} — ${example.title}`} />
            </div>
          ),
        },
        { label: "Code", content: <CodeBlock code={example.code} /> },
      ]}
    />
  );
}
