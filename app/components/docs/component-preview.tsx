import type { Example } from "@/lib/registry";
import { CodeBlock } from "./code-block";
import { PreviewFrame } from "./preview-frame";
import { DocTabs } from "./tabs";

/** A live preview of an example, rendered by PyBlade, with its source one tab away. */
export function ComponentPreview({ example, name, labels = { preview: "Aperçu", code: "Code", copy: "Copier le code" } }: { example: Example; name: string; labels?: { preview: string; code: string; copy: string } }) {
  return (
    <DocTabs
      tabs={[
        {
          label: labels.preview,
          content: (
            <div className="iso-dots overflow-hidden rounded-xl border border-border">
              <PreviewFrame html={example.html} height={example.height} full={example.full} title={`${name} — ${example.title}`} />
            </div>
          ),
        },
        { label: labels.code, content: <CodeBlock code={example.code} copyLabel={labels.copy} /> },
      ]}
    />
  );
}
