"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { useAppSelector } from "@/store/hooks";
import { todayInArabic } from "@/lib/utils/format-date";
import { PrayerCard } from "./PrayerCard";
import { CitySelector } from "./CitySelector";
import { Skeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import type { PrayerTimings } from "@/types/prayer";

const PRAYERS: Array<{ key: keyof PrayerTimings; label: string }> = [
  { key: "Fajr", label: "الفجر" },
  { key: "Sunrise", label: "الشروق" },
  { key: "Dhuhr", label: "الظهر" },
  { key: "Asr", label: "العصر" },
  { key: "Maghrib", label: "المغرب" },
  { key: "Isha", label: "العشاء" },
];

interface PrayerTimesPanelProps {
  variant?: "full" | "strip";
}

export function PrayerTimesPanel({ variant = "full" }: PrayerTimesPanelProps) {
  const city = useAppSelector((s) => s.settings.city);
  const hydrated = useAppSelector((s) => s.settings.hydrated);
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    api
      .prayerTimes(city.city, city.country)
      .then((data) => {
        if (!cancelled) setTimings(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "خطأ غير معروف");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [city, hydrated]);

  const stripBase = variant === "strip"
    ? "mx-auto max-w-7xl px-4 md:px-8 py-8"
    : "max-w-6xl mx-auto";

  return (
    <section className={stripBase}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          {variant === "strip" ? (
            <>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary-800)]">
                مواقيت الصلاة
              </h2>
              <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                {city.arabicName} — {todayInArabic()}
              </p>
            </>
          ) : (
            <p className="text-sm text-[var(--color-ink-muted)]">
              {city.arabicName} — {todayInArabic()}
            </p>
          )}
        </div>
        <CitySelector />
      </div>

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRAYERS.map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      )}

      {error && !loading && (
        <ErrorState message={error} onRetry={() => setError(null)} />
      )}

      {timings && !loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRAYERS.map((p) => (
            <PrayerCard key={p.key} name={p.label} time={timings[p.key]} />
          ))}
        </div>
      )}
    </section>
  );
}
