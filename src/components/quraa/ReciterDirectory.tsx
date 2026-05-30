"use client";

import { useMemo, useState } from "react";
import { ReciterCard } from "./ReciterCard";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Reciter } from "@/types/reciter";

export function ReciterDirectory({ reciters }: { reciters: Reciter[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return reciters;
    return reciters.filter((r) => r.name.includes(q));
  }, [query, reciters]);

  const grouped = useMemo(() => {
    const map = new Map<string, Reciter[]>();
    for (const r of filtered) {
      const letter = r.letter || "—";
      const arr = map.get(letter) ?? [];
      arr.push(r);
      map.set(letter, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <>
      <div className="mb-6 max-w-md mx-auto">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="ابحث عن قارئ..."
        />
      </div>

      {grouped.length === 0 ? (
        <EmptyState title="لم يتم العثور على قارئ" message="جرّب اسماً آخر." />
      ) : (
        <div className="space-y-8">
          {grouped.map(([letter, items]) => (
            <div key={letter}>
              <h2 className="text-[var(--color-accent-600)] font-extrabold text-2xl mb-3 border-b border-[var(--color-primary-200)] pb-1">
                {letter}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {items.map((r) => (
                  <ReciterCard key={r.id} reciter={r} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
