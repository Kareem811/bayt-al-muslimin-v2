"use client";

import { useMemo, useState } from "react";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { playQueue, type AudioTrack } from "@/store/slices/audioSlice";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { cn } from "@/lib/utils/cn";
import type { Reciter, RecitedSurah } from "@/types/reciter";

interface ReciterPlayerProps {
  reciter: Reciter;
  suwar: RecitedSurah[];
}

interface RecitedItem {
  id: number;
  name: string;
  makkia: number;
  src: string;
}

function buildItems(
  reciter: Reciter,
  moshafIndex: number,
  suwar: RecitedSurah[],
): RecitedItem[] {
  const moshaf = reciter.moshaf[moshafIndex];
  if (!moshaf) return [];
  const allowed = new Set(
    moshaf.surah_list.split(",").map((s) => Number(s.trim())).filter(Boolean),
  );
  return suwar
    .filter((s) => allowed.size === 0 || allowed.has(s.id))
    .map((s) => ({
      id: s.id,
      name: s.name,
      makkia: s.makkia,
      src: `${moshaf.server}${String(s.id).padStart(3, "0")}.mp3`,
    }));
}

export function ReciterPlayer({ reciter, suwar }: ReciterPlayerProps) {
  const dispatch = useAppDispatch();
  const [moshafIdx, setMoshafIdx] = useState(0);
  const playingContext = useAppSelector((s) => s.audio.context);
  const playingIndex = useAppSelector((s) => s.audio.index);

  const context = `reciter:${reciter.id}:${moshafIdx}`;

  const items = useMemo(
    () => buildItems(reciter, moshafIdx, suwar),
    [reciter, moshafIdx, suwar],
  );

  const queue = useMemo<AudioTrack[]>(
    () =>
      items.map((s) => ({
        src: s.src,
        title: `سورة ${s.name}`,
        subtitle: `الشيخ ${reciter.name}`,
      })),
    [items, reciter.name],
  );

  const handlePlay = (index: number) => {
    if (!queue[index]) return;
    dispatch(playQueue({ queue, index, context }));
  };

  const playingHere = playingContext === context;

  return (
    <>
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-1">
          الشيخ {reciter.name}
        </h1>
        <p className="text-[var(--color-ink-muted)] text-sm">
          {reciter.moshaf.length} رواية متاحة
        </p>
      </header>

      {reciter.moshaf.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-sm font-medium text-[var(--color-primary-800)]">
            الرواية:
          </span>
          <select
            value={moshafIdx}
            onChange={(e) => setMoshafIdx(Number(e.target.value))}
            className="px-4 py-2 rounded-full bg-white border border-[var(--color-primary-200)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-400)]"
          >
            {reciter.moshaf.map((m, idx) => (
              <option key={m.id} value={idx}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((s, idx) => {
          const isActive = playingHere && playingIndex === idx;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handlePlay(idx)}
              className={cn(
                "flex items-center gap-3 p-4 rounded-2xl border text-right transition-all",
                isActive
                  ? "bg-gradient-to-br from-[var(--color-accent-500)] to-[var(--color-accent-400)] text-[var(--color-primary-900)] border-transparent shadow-lg"
                  : "bg-white border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-md",
              )}
            >
              <IoMdArrowDropleftCircle
                className={cn(
                  "shrink-0",
                  isActive ? "text-[var(--color-primary-900)]" : "text-[var(--color-accent-500)]",
                )}
                size={26}
              />
              <span
                className={cn(
                  "text-sm font-bold w-8 text-center",
                  isActive ? "text-[var(--color-primary-900)]" : "text-[var(--color-primary-700)]",
                )}
              >
                {toArabicNumerals(s.id)}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className={cn(
                    "font-bold truncate",
                    isActive ? "text-[var(--color-primary-900)]" : "text-[var(--color-primary-800)]",
                  )}
                >
                  {s.name}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    isActive ? "text-[var(--color-primary-900)]/70" : "text-[var(--color-ink-muted)]",
                  )}
                >
                  {s.makkia === 1 ? "مكية" : "مدنية"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}
