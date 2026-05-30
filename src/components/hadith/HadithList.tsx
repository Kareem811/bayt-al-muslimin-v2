"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import type { HadithItem } from "@/types/hadith";

const PAGE_SIZE = 20;

export function HadithList({ items }: { items: HadithItem[] }) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return items;
    return items.filter((h) => h.arab.includes(q));
  }, [query, items]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = filtered.length > visibleCount;

  return (
    <>
      <div className="mb-6 max-w-xl mx-auto">
        <SearchInput
          value={query}
          onChange={(v) => {
            setQuery(v);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="ابحث في الأحاديث..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="لا توجد نتائج" message="حاول كلمات أخرى." />
      ) : (
        <ul className="space-y-4">
          {visible.map((h, idx) => (
            <li
              key={`${h.number}-${idx}`}
              className="rounded-3xl bg-white border border-[var(--color-primary-100)] p-6 md:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-[var(--color-accent-700)] bg-[var(--color-accent-500)]/15 px-3 py-1 rounded-full">
                  الحديث {toArabicNumerals(h.number)}
                </span>
              </div>
              <p className="font-quran text-xl md:text-2xl leading-loose text-[var(--color-primary-900)]">
                {h.arab}
              </p>
            </li>
          ))}
        </ul>
      )}

      {canLoadMore && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="px-6 py-3 rounded-full bg-[var(--color-primary-800)] text-white font-medium hover:bg-[var(--color-primary-700)] transition-colors"
          >
            عرض المزيد
          </button>
        </div>
      )}
    </>
  );
}
