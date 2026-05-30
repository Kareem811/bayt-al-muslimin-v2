"use client";

import { useState } from "react";
import { TafseerDialog } from "./TafseerDialog";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import type { AyahWithTafseer } from "@/types/quran";

const BISMILLAH = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";

export function AyahList({
  ayahs,
  surahName,
}: {
  ayahs: AyahWithTafseer[];
  surahName: string;
}) {
  const [selected, setSelected] = useState<AyahWithTafseer | null>(null);
  const showBismillah = ayahs[0]?.arabic_text !== BISMILLAH;

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          سورة {surahName}
        </h1>
        {showBismillah && (
          <p className="font-quran text-2xl md:text-3xl text-[var(--color-primary-900)] mt-4">
            {BISMILLAH}
          </p>
        )}
      </div>

      <div className="rounded-3xl bg-white border border-[var(--color-primary-100)] p-6 md:p-10 shadow-sm">
        <p className="font-quran text-2xl md:text-3xl leading-loose text-justify text-[var(--color-primary-900)] selection:bg-[var(--color-accent-300)] selection:text-[var(--color-primary-900)]">
          {ayahs.map((ayah, idx) => (
            <button
              key={ayah.aya || idx}
              type="button"
              onClick={() => setSelected(ayah)}
              className="inline cursor-pointer hover:text-[var(--color-primary-600)] focus:outline-none focus:bg-[var(--color-accent-300)]/40 rounded transition-colors"
              aria-label={`عرض تفسير الآية ${ayah.aya}`}
            >
              <span>{ayah.arabic_text}</span>
              <span className="inline-grid place-items-center mx-1 align-middle w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)] text-sm md:text-base font-sans">
                {toArabicNumerals(ayah.aya)}
              </span>{" "}
            </button>
          ))}
        </p>
      </div>

      <TafseerDialog ayah={selected} onClose={() => setSelected(null)} />
    </>
  );
}
