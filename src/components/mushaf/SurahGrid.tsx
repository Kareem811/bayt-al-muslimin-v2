"use client";

import { useMemo, useState } from "react";
import { SurahCard } from "./SurahCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Surah } from "@/types/quran";

export function SurahGrid({ surahs }: { surahs: Surah[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return surahs;
    return surahs.filter(
      (s) =>
        s.name.includes(q) ||
        s.englishName.toLowerCase().includes(q.toLowerCase()) ||
        String(s.number).startsWith(q),
    );
  }, [query, surahs]);

  return (
    <>
      <div className="mb-6 max-w-md mx-auto">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="ابحث عن سورة..."
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="لم يتم العثور على نتائج" message="جرّب اسم سورة آخر." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((s) => (
            <SurahCard
              key={s.number}
              number={s.number}
              name={s.name}
              numberOfAyahs={s.numberOfAyahs}
              revelationType={s.revelationType}
            />
          ))}
        </div>
      )}
    </>
  );
}
