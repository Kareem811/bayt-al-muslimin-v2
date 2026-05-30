import { notFound } from "next/navigation";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { HadithList } from "@/components/hadith/HadithList";
import {
  HADITH_COLLECTIONS,
  getCollectionName,
} from "@/lib/constants/hadith-collections";
import type { HadithApiResponse } from "@/types/hadith";

const VALID = new Set(HADITH_COLLECTIONS.map((c) => c.slug));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return {
    title: `أحاديث ${getCollectionName(category)}`,
  };
}

export function generateStaticParams() {
  return HADITH_COLLECTIONS.map((c) => ({ category: c.slug }));
}

async function getHadiths(category: string): Promise<HadithApiResponse> {
  return fetchUpstream<HadithApiResponse>(
    `${upstream.hadith()}/hadith/${category}?page=1&limit=300`,
    { revalidate: 86400 },
  );
}

export default async function HadithCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.has(category)) notFound();

  const data = await getHadiths(category);

  return (
    <section className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-1">
          {getCollectionName(category)}
        </h1>
        <p className="text-[var(--color-ink-muted)] text-sm">
          عرض {data.items.length} حديث
        </p>
      </header>
      <HadithList items={data.items} />
    </section>
  );
}
