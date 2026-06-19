import Link from "next/link";
import { notFound } from "next/navigation";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { AyahList } from "@/components/mushaf/AyahList";
import { RecordLastRead } from "@/components/mushaf/RecordLastRead";
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

  const currentName = getSurahName(surahId);
  const prevId = id > 1 ? id - 1 : null;
  const prevName = prevId ? getSurahName(prevId) : "";
  const nextId = id < 114 ? id + 1 : null;
  const nextName = nextId ? getSurahName(nextId) : "";

  return (
    <section className="mx-auto max-w-4xl px-4 md:px-8 py-10 md:py-14">
      <RecordLastRead id={id} name={currentName} />
      <AyahList ayahs={ayahs} surahName={currentName} />

      <nav
        className="mt-10 grid grid-cols-3 items-stretch gap-2 md:gap-3"
        aria-label="التنقل بين السور"
      >
        {prevId ? (
          <Link
            href={`/mushaf/${prevId}`}
            className="group flex items-center gap-2 md:gap-3 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-md p-3 md:p-5 transition-all text-right"
          >
            <span className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-[var(--color-accent-300)] grid place-items-center transition-transform group-hover:translate-x-1">
              <IoMdArrowForward className="text-lg md:text-xl" />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] md:text-xs text-[var(--color-ink-muted)]">
                السورة السابقة
              </span>
              <span className="block text-sm md:text-lg font-extrabold text-[var(--color-primary-800)] truncate">
                سورة {prevName}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}

        <div className="grid place-items-center text-center px-1">
          <span className="text-[10px] md:text-xs text-[var(--color-ink-muted)]">
            السورة الحالية
          </span>
          <span className="max-w-full truncate text-sm md:text-lg font-extrabold text-[var(--color-primary-900)]">
            سورة {currentName}
          </span>
        </div>

        {nextId ? (
          <Link
            href={`/mushaf/${nextId}`}
            className="group flex items-center justify-end gap-2 md:gap-3 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-md p-3 md:p-5 transition-all text-left"
          >
            <span className="min-w-0">
              <span className="block text-[10px] md:text-xs text-[var(--color-ink-muted)]">
                السورة التالية
              </span>
              <span className="block text-sm md:text-lg font-extrabold text-[var(--color-primary-800)] truncate">
                سورة {nextName}
              </span>
            </span>
            <span className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-[var(--color-accent-300)] grid place-items-center transition-transform group-hover:-translate-x-1">
              <IoMdArrowBack className="text-lg md:text-xl" />
            </span>
          </Link>
        ) : (
          <span aria-hidden />
        )}
      </nav>
    </section>
  );
}
