import Link from "next/link";
import { CodeBlock } from "@/app/components/docs/code-block";
import { ComponentPreview } from "@/app/components/docs/component-preview";
import { DocTabs } from "@/app/components/docs/tabs";
import type { Locale } from "@/lib/i18n";
import { docsDictionaries, docsPath } from "@/lib/i18n-docs";
import { examplesFor, type RegistryItem, ordered } from "@/lib/registry";
import { Badge, DocPage, H2, H3, P, slug, type TocEntry } from "./doc-page";
import { extrasFor } from "./extras";

const tag = (path: string) =>
  "<pb-" + path.replace(/^components\//, "").replace(/\.html$/, "").replace("/", ".").replaceAll("_", "-") + ">";

/** A default value as Python writes it. */
const py = (v: unknown): string =>
  v === null ? "None" : v === true ? "True" : v === false ? "False" : typeof v === "string" ? `'${v}'` : String(v);

const step =
  "relative [counter-increment:step] before:absolute before:-left-[37px] before:grid before:size-6 before:place-items-center before:rounded-full before:border before:border-border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]";

/** A component's docs page: preview, installation, usage, examples and props. */
export function ComponentPage({ item, locale }: { item: RegistryItem; locale: Locale }) {
  const t = docsDictionaries[locale];
  const extras = extrasFor(locale)[item.name];
  const index = ordered.findIndex((i) => i.name === item.name);
  const prev = ordered[index - 1], next = ordered[index + 1];
  const [first, ...more] = examplesFor(item, locale);
  const withProps = item.files.filter((f) => Object.keys(f.props).length > 0);
  const labels = { preview: t.preview, code: t.code, copy: t.copyCode };

  const toc: TocEntry[] = [
    { id: "installation", label: t.installation },
    ...(item.usage ? [{ id: "usage", label: t.usage }] : []),
    ...(extras?.toc ?? []),
    ...(more.length ? [{ id: "examples", label: t.examples }, ...more.map((e) => ({ id: slug(e.title), label: e.title, depth: 2 }))] : []),
    ...(withProps.length ? [{ id: "props", label: t.props }] : []),
  ];

  return (
    <DocPage
      crumbs={[t.docs, item.type === "block" ? t.blocks : t.components, item.title]}
      title={item.title}
      description={item.description}
      toc={toc}
      onThisPage={t.onThisPage}
      badges={
        <>
          {item.js.map((j) => <Badge key={j}>{j === "alpinejs" ? "Alpine.js" : j}</Badge>)}
          {item.dependencies.map((d) => <Badge key={d}>{t.dependsOn} {d}</Badge>)}
          <Badge>{t.files(item.files.length)}</Badge>
        </>
      }
      prev={prev && { href: docsPath(locale, `/components/${prev.name}`), label: prev.title }}
      next={next && { href: docsPath(locale, `/components/${next.name}`), label: next.title }}
    >
      {first && <ComponentPreview example={first} name={item.title} labels={labels} />}

      <H2 id="installation">{t.installation}</H2>
      <DocTabs
        tabs={[
          { label: "CLI", content: <CodeBlock code={`pyblade-ui add ${item.name}`} lang="bash" copyLabel={t.copyCode} /> },
          {
            label: t.manual,
            content: (
              <ol className="space-y-6 border-l border-border pl-6 [counter-reset:step]">
                {(item.dependencies.length > 0 || item.js.length > 0) && (
                  <li className={step}>
                    <div className="font-medium">{t.installDeps}</div>
                    <P>
                      {item.dependencies.map((d, i) => (
                        <span key={d}>
                          {i > 0 && ", "}
                          <Link href={docsPath(locale, `/components/${d}`)} className="font-medium text-foreground underline underline-offset-4">{d}</Link>
                        </span>
                      ))}
                      {item.dependencies.length > 0 && item.js.length > 0 && t.and}
                      {item.js.includes("alpinejs") && <>{t.alpineInHead} <code>&lt;head&gt;</code></>}.
                    </P>
                  </li>
                )}
                <li className={step}>
                  <div className="font-medium">{t.copyFiles(item.files.length)}</div>
                  <div className="mt-3 space-y-3">
                    {item.files.map((f) => <CodeBlock key={f.path} code={f.content} filename={f.path} copyLabel={t.copyCode} />)}
                  </div>
                </li>
                <li className={step}>
                  <div className="font-medium">{t.adaptPath}</div>
                  <P>
                    {t.adaptPathBody[0]} <code>{t.adaptPathBody[1]}</code> {t.adaptPathBody[2]} <code>{t.adaptPathBody[3]}</code>
                    {t.adaptPathBody[4]}
                  </P>
                </li>
              </ol>
            ),
          },
        ]}
      />

      {item.usage && (
        <>
          <H2 id="usage">{t.usage}</H2>
          <P>
            {t.tagsAvailable(item.files.length)}{" "}
            {item.files.map((f, i) => (
              <span key={f.path}>{i > 0 && " "}<code>{tag(f.path)}</code></span>
            ))}{" "}
            {t.tagsAvailableEnd(item.files.length)}
          </P>
          <CodeBlock code={item.usage} copyLabel={t.copyCode} />
        </>
      )}

      {extras?.content}

      {more.length > 0 && (
        <>
          <H2 id="examples">{t.examples}</H2>
          {more.map((e) => (
            <div key={e.title} className="space-y-4">
              <H3 id={slug(e.title)}>{e.title}</H3>
              <ComponentPreview example={e} name={item.title} labels={labels} />
            </div>
          ))}
        </>
      )}

      {withProps.length > 0 && (
        <>
          <H2 id="props">{t.props}</H2>
          {withProps.map((f) => (
            <div key={f.path} className="space-y-3">
              {withProps.length > 1 && <div className="font-mono text-sm">{tag(f.path)}</div>}
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">{t.prop}</th>
                      <th className="px-4 py-2.5 font-medium">{t.default}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(f.props).map(([k, v]) => (
                      <tr key={k} className="border-t border-border">
                        <td className="px-4 py-2.5 font-mono text-[13px]">{k}</td>
                        <td className="px-4 py-2.5 font-mono text-[13px] text-muted-foreground">{py(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <P>
            {t.propsNote[0]}
            <code>class</code>, <code>id</code>, <code>x-on:click</code>, <code>hx-post</code>…{t.propsNote[1]}
          </P>
        </>
      )}
    </DocPage>
  );
}
