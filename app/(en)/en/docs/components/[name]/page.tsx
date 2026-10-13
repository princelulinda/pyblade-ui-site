import { notFound } from "next/navigation";
import { ComponentPage } from "@/app/components/docs-site/component-page";
import { getItem, ordered } from "@/lib/registry";

export function generateStaticParams() {
  return ordered.map((i) => ({ name: i.name }));
}

export async function generateMetadata({ params }: PageProps<"/en/docs/components/[name]">) {
  const item = getItem((await params).name);
  return item ? { title: `${item.title} — PyBlade UI`, description: item.description } : {};
}

export default async function Page({ params }: PageProps<"/en/docs/components/[name]">) {
  const item = getItem((await params).name);
  if (!item) notFound();
  return <ComponentPage item={item} locale="en" />;
}
