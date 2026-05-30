import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { SurahGrid } from "@/components/mushaf/SurahGrid";
import type { Surah } from "@/types/quran";

export const metadata = {
  title: "المصحف المرتل",
};

interface AlquranSurahListResponse {
  data: Surah[];
}

async function getSurahs(): Promise<Surah[]> {
  const data = await fetchUpstream<AlquranSurahListResponse>(
    `${upstream.alquran()}/surah`,
    { revalidate: 86400 },
  );
  return data.data;
}

export default async function MushafPage() {
  const surahs = await getSurahs();
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          المصحف المرتل
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          تصفّح سور القرآن الكريم واقرأ كل سورة مع التفسير الميسر
        </p>
      </header>
      <SurahGrid surahs={surahs} />
    </section>
  );
}
