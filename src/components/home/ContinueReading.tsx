"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoBook, IoArrowBack } from "react-icons/io5";
import { LAST_READ_KEY } from "@/components/mushaf/RecordLastRead";

interface LastRead {
  id: number;
  name: string;
}

export function ContinueReading() {
  const [last, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(LAST_READ_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.id) {
            setLast({ id: Number(parsed.id), name: String(parsed.name ?? "") });
          }
        }
      } catch {
        /* تجاهل */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!last) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pt-8">
      <Link
        href={`/mushaf/${last.id}`}
        className="group flex items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-[var(--color-primary-700)] to-[var(--color-primary-900)] text-white p-5 md:p-6 shadow-lg hover:shadow-xl transition-all"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="w-12 h-12 shrink-0 rounded-2xl bg-[var(--color-accent-500)] text-[var(--color-primary-900)] grid place-items-center">
            <IoBook size={24} />
          </span>
          <div className="min-w-0">
            <div className="text-[var(--color-accent-300)] text-sm">أكمل القراءة</div>
            <div className="font-extrabold text-lg truncate">سورة {last.name}</div>
          </div>
        </div>
        <IoArrowBack
          size={24}
          className="shrink-0 transition-transform group-hover:-translate-x-1"
        />
      </Link>
    </section>
  );
}
