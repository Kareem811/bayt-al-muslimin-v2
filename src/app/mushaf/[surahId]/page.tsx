import { notFound } from "next/navigation";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { AyahList } from "@/components/mushaf/AyahList";
import { getSurahName } from "@/lib/constants/surah-names";
import type { AyahWithTafseer } from "@/types/quran";

interface QuranEncResponse {
  result: AyahWithTafseer[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ surahId: string }>;
}) {
  const { surahId } = await params;
  const name = getSurahName(surahId);
  return {
    title: name ? `سورة ${name}` : "سورة",
  };
}

async function getSurah(surahId: string): Promise<AyahWithTafseer[]> {
  const data = await fetchUpstream<QuranEncResponse>(
    `${upstream.quranenc()}/translation/sura/arabic_moyassar/${surahId}`,
    { revalidate: 86400 },
  );
  return data.result;
}

export default async function SingleSurahPage({
  params,
}: {
  params: Promise<{ surahId: string }>;
}) {
  const { surahId } = await params;
  const id = Number(surahId);
  if (!Number.isFinite(id) || id < 1 || id > 114) notFound();

  const ayahs = await getSurah(surahId);
  if (!ayahs || ayahs.length === 0) notFound();

  return (
    <section className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-14">
      <AyahList ayahs={ayahs} surahName={getSurahName(surahId)} />
    </section>
  );
}
