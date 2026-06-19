"use client";

import { useEffect, useState } from "react";
import { IoRefresh } from "react-icons/io5";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { cn } from "@/lib/utils/cn";

const ADHKAR = [
  "سُبْحَانَ اللَّهِ",
  "الْحَمْدُ لِلَّهِ",
  "اللَّهُ أَكْبَرُ",
  "لَا إِلَهَ إِلَّا اللَّهُ",
  "أَسْتَغْفِرُ اللَّهَ",
  "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
];

const TARGET = 33;
const STORAGE_KEY = "tasbeeh-counts";

export function TasbeehCounter() {
  const [selected, setSelected] = useState(0);
  const [counts, setCounts] = useState<number[]>(() => ADHKAR.map(() => 0));

  // تحميل العدّ المحفوظ بعد التحميل (لتفادي اختلاف الخادم/العميل)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length === ADHKAR.length) {
            setCounts(parsed.map((n) => Number(n) || 0));
          }
        }
      } catch {
        /* تجاهل */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const persist = (next: number[]) => {
    setCounts(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* تجاهل */
    }
  };

  const count = counts[selected];
  const inSet = count % TARGET;
  const sets = Math.floor(count / TARGET);

  const tap = () => {
    const next = [...counts];
    next[selected] = count + 1;
    persist(next);
    // اهتزاز خفيف عند اكتمال كل ٣٣
    if ((count + 1) % TARGET === 0 && typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(120);
    }
  };

  const resetCurrent = () => {
    const next = [...counts];
    next[selected] = 0;
    persist(next);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* اختيار الذكر */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {ADHKAR.map((dhikr, idx) => (
          <button
            key={dhikr}
            type="button"
            onClick={() => setSelected(idx)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-bold transition-all",
              idx === selected
                ? "bg-[var(--color-primary-800)] text-white shadow"
                : "bg-white text-[var(--color-primary-700)] border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)]",
            )}
          >
            {dhikr}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-white border border-[var(--color-primary-100)] shadow-sm p-6 md:p-10 text-center">
        <p className="font-quran text-3xl md:text-4xl text-[var(--color-primary-900)] mb-2">
          {ADHKAR[selected]}
        </p>
        <p className="text-sm text-[var(--color-ink-muted)] mb-8">
          المجموعات المكتملة: {toArabicNumerals(sets)} · الإجمالي: {toArabicNumerals(count)}
        </p>

        {/* الزر الكبير للعدّ */}
        <button
          type="button"
          onClick={tap}
          aria-label="اضغط للتسبيح"
          className="relative mx-auto w-52 h-52 md:w-60 md:h-60 rounded-full grid place-items-center bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-900)] text-white shadow-2xl ring-8 ring-[var(--color-primary-100)] active:scale-95 transition-transform"
        >
          <span className="text-6xl md:text-7xl font-extrabold tabular-nums">
            {toArabicNumerals(inSet)}
          </span>
          <span className="absolute bottom-9 text-[var(--color-accent-300)] text-sm">
            / {toArabicNumerals(TARGET)}
          </span>
        </button>

        <div className="mt-8">
          <button
            type="button"
            onClick={resetCurrent}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-primary-100)] text-[var(--color-primary-700)] font-bold hover:bg-[var(--color-primary-200)] transition-colors"
          >
            <IoRefresh size={18} />
            تصفير
          </button>
        </div>
      </div>
    </div>
  );
}
