"use client";

import { useEffect, useState } from "react";
import { IoCheckmark, IoSunny, IoMoon, IoRefresh, IoArrowBack } from "react-icons/io5";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { cn } from "@/lib/utils/cn";
import { MORNING_ADHKAR, EVENING_ADHKAR, type Dhikr } from "@/lib/constants/adhkar";

type Mode = "morning" | "evening";

const CLOSING_DUA =
  "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.";

export function AdhkarRunner() {
  const [mode, setMode] = useState<Mode>("morning");
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  // اختيار افتراضي ذكي حسب وقت اليوم (على العميل لتفادي اختلاف التوقيت)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const hour = new Date().getHours();
      if (hour >= 15 || hour < 4) setMode("evening");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const list = mode === "morning" ? MORNING_ADHKAR : EVENING_ADHKAR;
  const current: Dhikr = list[index];
  const reached = count >= current.count;

  const reset = () => {
    setIndex(0);
    setCount(0);
    setDone(false);
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    reset();
  };

  const tap = () => {
    if (count < current.count) setCount((c) => c + 1);
  };

  const advance = () => {
    if (index < list.length - 1) {
      setIndex((i) => i + 1);
      setCount(0);
    } else {
      setDone(true);
    }
  };

  const theme =
    mode === "morning"
      ? {
          from: "from-[var(--color-accent-400)]",
          to: "to-[var(--color-accent-600)]",
          ring: "ring-[var(--color-accent-300)]",
          text: "text-[var(--color-primary-900)]",
        }
      : {
          from: "from-[var(--color-primary-600)]",
          to: "to-[var(--color-primary-900)]",
          ring: "ring-[var(--color-primary-300)]",
          text: "text-white",
        };

  return (
    <div className="max-w-2xl mx-auto">
      {/* مبدّل الصباح/المساء */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => switchMode("morning")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all",
            mode === "morning"
              ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)] shadow"
              : "bg-white text-[var(--color-primary-700)] border border-[var(--color-primary-200)] hover:border-[var(--color-accent-400)]",
          )}
        >
          <IoSunny size={20} />
          أذكار الصباح
        </button>
        <button
          type="button"
          onClick={() => switchMode("evening")}
          className={cn(
            "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all",
            mode === "evening"
              ? "bg-[var(--color-primary-800)] text-white shadow"
              : "bg-white text-[var(--color-primary-700)] border border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)]",
          )}
        >
          <IoMoon size={18} />
          أذكار المساء
        </button>
      </div>

      {done ? (
        <CompletionCard
          mode={mode}
          onRestart={reset}
          onSwitch={() => switchMode(mode === "morning" ? "evening" : "morning")}
        />
      ) : (
        <>
          {/* شريط التقدّم */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm text-[var(--color-ink-muted)] mb-2">
              <span>
                الذكر {toArabicNumerals(index + 1)} من {toArabicNumerals(list.length)}
              </span>
              <span>{toArabicNumerals(Math.round(((index) / list.length) * 100))}٪</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--color-primary-100)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-accent-500)] transition-all duration-500"
                style={{ width: `${(index / list.length) * 100}%` }}
              />
            </div>
          </div>

          {/* بطاقة الذكر */}
          <div className="rounded-3xl bg-white border border-[var(--color-primary-100)] shadow-sm p-6 md:p-9">
            <p className="font-quran text-2xl md:text-3xl leading-loose text-center text-[var(--color-primary-900)]">
              {current.text}
            </p>

            {current.note && (
              <p className="mt-5 text-center text-sm text-[var(--color-ink-muted)] bg-[var(--color-primary-50)] rounded-2xl px-4 py-3">
                {current.note}
              </p>
            )}

            {/* العدّاد القابل للنقر */}
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={tap}
                aria-label="اضغط للتكرار"
                className={cn(
                  "relative w-28 h-28 rounded-full grid place-items-center text-white shadow-lg ring-4 transition-transform active:scale-95 bg-gradient-to-br",
                  theme.from,
                  theme.to,
                  theme.ring,
                )}
              >
                {reached ? (
                  <IoCheckmark size={48} className={theme.text} />
                ) : (
                  <span className={cn("text-4xl font-extrabold", theme.text)}>
                    {toArabicNumerals(current.count - count)}
                  </span>
                )}
              </button>
              <span className="text-sm text-[var(--color-ink-muted)]">
                {reached
                  ? "اكتمل هذا الذكر"
                  : `كرّر ${toArabicNumerals(current.count)} ${current.count > 2 ? "مرات" : current.count === 2 ? "مرتين" : "مرة"}`}
              </span>
            </div>
          </div>

          {/* زر الانتقال للذكر التالي */}
          <button
            type="button"
            onClick={advance}
            className={cn(
              "mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all",
              reached
                ? "bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-800)] shadow-lg animate-pulse"
                : "bg-[var(--color-primary-100)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-200)]",
            )}
          >
            <IoCheckmark size={24} />
            {index < list.length - 1 ? "الذكر التالي" : "إنهاء الأذكار"}
          </button>
        </>
      )}
    </div>
  );
}

function CompletionCard({
  mode,
  onRestart,
  onSwitch,
}: {
  mode: Mode;
  onRestart: () => void;
  onSwitch: () => void;
}) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary-800)] to-[var(--color-primary-900)] text-white p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-accent-500)]/15 blur-3xl"
        aria-hidden
      />
      <div className="relative">
        <div className="mx-auto w-16 h-16 rounded-full bg-[var(--color-accent-500)] grid place-items-center text-[var(--color-primary-900)] mb-5">
          <IoCheckmark size={36} />
        </div>
        <h2 className="text-gradient-gold text-2xl md:text-3xl font-extrabold mb-2">
          تقبّل الله طاعتك
        </h2>
        <p className="text-white/80 mb-6">
          أتممتَ {mode === "morning" ? "أذكار الصباح" : "أذكار المساء"} بحمد الله.
        </p>
        <p className="font-quran text-xl md:text-2xl leading-loose text-[var(--color-accent-300)] mb-8">
          {CLOSING_DUA}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent-500)] text-[var(--color-primary-900)] font-bold hover:brightness-105"
          >
            <IoRefresh size={20} />
            إعادة
          </button>
          <button
            type="button"
            onClick={onSwitch}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20"
          >
            <IoArrowBack size={20} />
            {mode === "morning" ? "أذكار المساء" : "أذكار الصباح"}
          </button>
        </div>
      </div>
    </div>
  );
}
