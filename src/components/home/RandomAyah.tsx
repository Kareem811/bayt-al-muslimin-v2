"use client";

import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { api } from "@/lib/api/client";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { Skeleton } from "@/components/ui/Skeleton";
import type { RandomAyah as RandomAyahType } from "@/types/quran";

export function RandomAyah() {
  const [ayah, setAyah] = useState<RandomAyahType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.randomAyah();
      setAyah(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "تعذّر تحميل الآية");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 md:px-8 py-12 md:py-16">
      <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary-800)] to-[var(--color-primary-900)] text-white p-8 md:p-12 shadow-2xl shadow-[var(--color-primary-900)]/20 relative overflow-hidden">
        <div
          className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--color-accent-500)]/15 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gradient-gold text-2xl md:text-3xl font-extrabold">
              آية لك
            </h2>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50"
              aria-label="آية جديدة"
            >
              <IoMdRefresh size={20} />
            </button>
          </div>

          {loading && (
            <div className="space-y-3">
              <Skeleton className="h-6 bg-white/10" />
              <Skeleton className="h-6 bg-white/10 w-5/6" />
              <Skeleton className="h-6 bg-white/10 w-4/6" />
            </div>
          )}

          {error && !loading && (
            <p className="text-red-200/90">{error}</p>
          )}

          {ayah && !loading && !error && (
            <>
              <p className="font-quran text-2xl md:text-3xl leading-loose text-white">
                {ayah.text}
              </p>
              <p className="mt-6 text-[var(--color-accent-300)]">
                سورة {ayah.surah.name} — الآية{" "}
                {toArabicNumerals(ayah.numberInSurah)}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
