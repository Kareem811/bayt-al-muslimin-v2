"use client";

import { useState, type CSSProperties } from "react";
import { IoRemove, IoAdd } from "react-icons/io5";
import { TafseerDialog } from "./TafseerDialog";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFontScale,
  FONT_SCALE_MIN,
  FONT_SCALE_MAX,
} from "@/store/slices/settingsSlice";
import type { AyahWithTafseer } from "@/types/quran";

const BISMILLAH = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ";

export function AyahList({ ayahs, surahName }: { ayahs: AyahWithTafseer[]; surahName: string }) {
  const [selected, setSelected] = useState<AyahWithTafseer | null>(null);
  const dispatch = useAppDispatch();
  const scale = useAppSelector((s) => s.settings.quranFontScale);
  const showBismillah = ayahs[0]?.arabic_text !== BISMILLAH;

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">سورة {surahName}</h1>
        {ayahs[0]?.sura !== "1" && showBismillah && <p className="font-quran text-2xl md:text-3xl text-[var(--color-primary-900)] mt-4">{BISMILLAH}</p>}
      </div>

      {/* أدوات التحكم في حجم الخط */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="text-sm text-[var(--color-ink-muted)]">حجم الخط</span>
        <button
          type="button"
          onClick={() => dispatch(setFontScale(scale - 0.1))}
          disabled={scale <= FONT_SCALE_MIN}
          className="w-9 h-9 grid place-items-center rounded-full bg-white border border-[var(--color-primary-200)] text-[var(--color-primary-700)] hover:border-[var(--color-accent-400)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="تصغير الخط"
        >
          <IoRemove size={18} />
        </button>
        <span className="w-12 text-center text-sm font-bold text-[var(--color-primary-800)] tabular-nums">
          {toArabicNumerals(Math.round(scale * 100))}٪
        </span>
        <button
          type="button"
          onClick={() => dispatch(setFontScale(scale + 0.1))}
          disabled={scale >= FONT_SCALE_MAX}
          className="w-9 h-9 grid place-items-center rounded-full bg-white border border-[var(--color-primary-200)] text-[var(--color-primary-700)] hover:border-[var(--color-accent-400)] disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="تكبير الخط"
        >
          <IoAdd size={18} />
        </button>
      </div>

      <div className="rounded-3xl bg-white border border-[var(--color-primary-100)] p-6 md:p-10 shadow-sm">
        <p
          className="font-quran text-[calc(1.5rem*var(--quran-scale,1))] md:text-[calc(1.875rem*var(--quran-scale,1))] leading-loose text-justify [text-align-last:center] text-[var(--color-primary-900)] selection:bg-[var(--color-accent-300)] selection:text-[var(--color-primary-900)]"
          style={{ "--quran-scale": scale } as CSSProperties}
          dir="rtl">
          {ayahs.map((ayah, idx) => (
            <span
              key={ayah.aya || idx}
              role="button"
              tabIndex={0}
              onClick={() => setSelected(ayah)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(ayah);
                }
              }}
              className="cursor-pointer hover:text-[var(--color-primary-600)] focus:outline-none focus-visible:bg-[var(--color-accent-300)]/40 rounded transition-colors"
              aria-label={`عرض تفسير الآية ${ayah.aya}`}>
              {ayah.arabic_text}
              <span className="inline-grid place-items-center mx-1 align-middle w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)] text-sm md:text-base font-sans">
                {toArabicNumerals(ayah.aya)}
              </span>{" "}
            </span>
          ))}
        </p>
      </div>

      <TafseerDialog ayah={selected} onClose={() => setSelected(null)} />
    </>
  );
}
