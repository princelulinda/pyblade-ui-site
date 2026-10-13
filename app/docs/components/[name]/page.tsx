import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/app/components/docs/code-block";
import { ComponentPreview } from "@/app/components/docs/component-preview";
import { DocTabs } from "@/app/components/docs/tabs";
import { getItem, ordered } from "@/lib/registry";
import { Badge, DocPage, H2, H3, P, slug, type TocEntry } from "../../doc-page";
import { extras } from "./extras";

export function generateStaticParams() {
  return ordered.map((i) => ({ name: i.name }));
}

export async function generateMetadata({ params }: PageProps<"/docs/components/[name]">) {
  const item = getItem((await params).name);
  return item ? { title: `${item.title} — PyBlade UI`, description: item.description } : {};
}

const tag = (path: string) =>
  "<pb-" + path.replace(/^components\//, "").replace(/\.html$/, "").replace("/", ".").replaceAll("_", "-") + ">";

/** A default value as Python writes it. */
const py = (v: unknown): string =>
  v === null ? "None" : v === true ? "True" : v === false ? "False" : typeof v === "string" ? `'${v}'` : String(v);

export default async function ComponentPage({ params }: PageProps<"/docs/components/[name]">) {
  const item = getItem((await params).name);
  if (!item) notFound();

  const index = ordered.findIndex((i) => i.name === item.name);
  const prev = ordered[index - 1], next = ordered[index + 1];
  const [first, ...more] = item.examples;
  const withProps = item.files.filter((f) => Object.keys(f.props).length > 0);

  const toc: TocEntry[] = [
    { id: "installation", label: "Installation" },
    ...(item.usage ? [{ id: "utilisation", label: "Utilisation" }] : []),
    ...(extras[item.name]?.toc ?? []),
    ...(more.length ? [{ id: "exemples", label: "Exemples" }, ...more.map((e) => ({ id: slug(e.title), label: e.title, depth: 2 }))] : []),
    ...(withProps.length ? [{ id: "props", label: "Props" }] : []),
  ];

  return (
    <DocPage
      crumbs={["Docs", item.type === "block" ? "Blocs" : "Composants", item.title]}
      title={item.title}
      description={item.description}
      toc={toc}
      badges={
        <>
          {item.js.map((j) => <Badge key={j}>{j === "alpinejs" ? "Alpine.js" : j}</Badge>)}
          {item.dependencies.map((d) => <Badge key={d}>dépend de {d}</Badge>)}
          <Badge>{item.files.length} fichier{item.files.length > 1 ? "s" : ""}</Badge>
        </>
      }
      prev={prev && { href: `/docs/components/${prev.name}`, label: prev.title }}
      next={next && { href: `/docs/components/${next.name}`, label: next.title }}
    >
      {first && <ComponentPreview example={first} name={item.title} />}

      <H2 id="installation">Installation</H2>
      <DocTabs
        tabs={[
          { label: "CLI", content: <CodeBlock code={`pyblade-ui add ${item.name}`} lang="bash" /> },
          {
            label: "Manuelle",
            content: (
              <ol className="space-y-6 border-l border-border pl-6 [counter-reset:step]">
                {(item.dependencies.length > 0 || item.js.length > 0) && (
                  <li className="relative [counter-increment:step] before:absolute before:-left-[37px] before:grid before:size-6 before:place-items-center before:rounded-full before:border before:border-border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
                    <div className="font-medium">Installez les dépendances</div>
                    <P>
                      {item.dependencies.map((d, i) => (
                        <span key={d}>
                          {i > 0 && ", "}
                          <Link href={`/docs/components/${d}`} className="font-medium text-foreground underline underline-offset-4">{d}</Link>
                        </span>
                      ))}
                      {item.dependencies.length > 0 && item.js.length > 0 && " et "}
                      {item.js.includes("alpinejs") && <>Alpine.js, chargé dans votre <code>&lt;head&gt;</code></>}.
                    </P>
                  </li>
                )}
                <li className="relative [counter-increment:step] before:absolute before:-left-[37px] before:grid before:size-6 before:place-items-center before:rounded-full before:border before:border-border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
                  <div className="font-medium">Copiez {item.files.length > 1 ? "ces fichiers" : "ce fichier"} dans votre projet</div>
                  <div className="mt-3 space-y-3">
                    {item.files.map((f) => <CodeBlock key={f.path} code={f.content} filename={f.path} />)}
                  </div>
                </li>
                <li className="relative [counter-increment:step] before:absolute before:-left-[37px] before:grid before:size-6 before:place-items-center before:rounded-full before:border before:border-border before:bg-background before:font-mono before:text-xs before:content-[counter(step)]">
                  <div className="font-medium">Adaptez le chemin à votre projet</div>
                  <P>Le dossier <code>components</code> est celui déclaré dans <code>pyblade.toml</code>.</P>
                </li>
              </ol>
            ),
          },
        ]}
      />

      {item.usage && (
        <>
          <H2 id="utilisation">Utilisation</H2>
          <P>
            {item.files.length > 1 ? "Les balises " : "La balise "}
            {item.files.map((f, i) => (
              <span key={f.path}>{i > 0 && " "}<code>{tag(f.path)}</code></span>
            ))}
            {item.files.length > 1 ? " sont disponibles" : " est disponible"} dans tous vos templates.
          </P>
          <CodeBlock code={item.usage} />
        </>
      )}

      {extras[item.name]?.content}

      {more.length > 0 && (
        <>
          <H2 id="exemples">Exemples</H2>
          {more.map((e) => (
            <div key={e.title} className="space-y-4">
              <H3 id={slug(e.title)}>{e.title}</H3>
              <ComponentPreview example={e} name={item.title} />
            </div>
          ))}
        </>
      )}

      {withProps.length > 0 && (
        <>
          <H2 id="props">Props</H2>
          {withProps.map((f) => (
            <div key={f.path} className="space-y-3">
              {withProps.length > 1 && <div className="font-mono text-sm">{tag(f.path)}</div>}
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Prop</th>
                      <th className="px-4 py-2.5 font-medium">Défaut</th>
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
          <P>Tout autre attribut (<code>class</code>, <code>id</code>, <code>x-on:click</code>, <code>hx-post</code>…) est transmis à l&apos;élément racine ; vos classes Tailwind l&apos;emportent sur celles du composant.</P>
        </>
      )}
    </DocPage>
  );
}
