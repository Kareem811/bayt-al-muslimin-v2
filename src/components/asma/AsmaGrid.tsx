"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { ASMA_ALLAH } from "@/lib/constants/asma-allah";

export function AsmaGrid() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return ASMA_ALLAH;
    return ASMA_ALLAH.filter(
      (n) => n.name.includes(q) || n.meaning.includes(q),
    );
  }, [query]);

  return (
    <>
      <div className="mb-6 max-w-md mx-auto">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="ابحث عن اسم..."
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="لم يتم العثور على اسم" message="جرّب كلمة أخرى." />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.map((n) => (
            <div
              key={n.id}
              className="group relative rounded-2xl bg-white border border-[var(--color-primary-100)] p-5 text-center hover:border-[var(--color-accent-400)] hover:shadow-md transition-all overflow-hidden"
            >
              <span
                className="absolute top-2 left-2 text-xs font-bold text-[var(--color-primary-300)]"
                aria-hidden
              >
                {toArabicNumerals(n.id)}
              </span>
              <div
                className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-[var(--color-accent-500)]/5 group-hover:bg-[var(--color-accent-500)]/10 transition-colors"
                aria-hidden
              />
              <h3 className="relative font-quran text-2xl md:text-3xl text-[var(--color-primary-800)] mb-2">
                {n.name}
              </h3>
              <p className="relative text-xs md:text-sm text-[var(--color-ink-muted)] leading-relaxed">
                {n.meaning}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
