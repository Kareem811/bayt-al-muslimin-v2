"use client";

import { useMemo, useState } from "react";
import { IoRadioSharp } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { playQueue, type AudioTrack } from "@/store/slices/audioSlice";
import { SearchInput } from "@/components/ui/SearchInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { cn } from "@/lib/utils/cn";
import type { Radio } from "@/types/radio";

const CONTEXT = "radio";
const PAGE_SIZE = 12;

export function RadioDirectory({ radios }: { radios: Radio[] }) {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const playingContext = useAppSelector((s) => s.audio.context);
  const playingIndex = useAppSelector((s) => s.audio.index);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };
  const queue = useMemo<AudioTrack[]>(() => radios.map((r) => ({ src: r.url, title: r.name, subtitle: "بث مباشر" })), [radios]);

  const filtered = useMemo(() => {
    const list = radios.map((radio, index) => ({ radio, index }));
    const q = query.trim();
    if (!q) return list;
    return list.filter((x) => x.radio.name.includes(q));
  }, [query, radios]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(1, totalPages));
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const playingHere = playingContext === CONTEXT;

  return (
    <>
      <div className="mb-6 max-w-md mx-auto">
        <SearchInput value={query} onChange={handleSearch} placeholder="ابحث عن إذاعة..." />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="لم يتم العثور على إذاعة" message="جرّب اسماً آخر." />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {paged.map(({ radio, index }) => {
              const isActive = playingHere && playingIndex === index;
              return (
                <button
                  key={radio.id}
                  type="button"
                  onClick={() => dispatch(playQueue({ queue, index, context: CONTEXT }))}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-2xl border text-right transition-all",
                    isActive
                      ? "bg-gradient-to-br from-[var(--color-accent-500)] to-[var(--color-accent-400)] text-[var(--color-primary-900)] border-transparent shadow-lg"
                      : "bg-white border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-md",
                  )}>
                  <div
                    className={cn(
                      "w-11 h-11 shrink-0 rounded-xl grid place-items-center",
                      isActive
                        ? "bg-[var(--color-primary-900)]/10 text-[var(--color-primary-900)]"
                        : "bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-[var(--color-accent-300)]",
                    )}>
                    <IoRadioSharp size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={cn("font-bold truncate", isActive ? "text-[var(--color-primary-900)]" : "text-[var(--color-primary-800)]")}>{radio.name}</h3>
                    <p className={cn("text-xs", isActive ? "text-[var(--color-primary-900)]/70" : "text-[var(--color-ink-muted)]")}>{isActive ? "قيد التشغيل" : "بث مباشر"}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <Pagination page={safePage} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </>
  );
}
