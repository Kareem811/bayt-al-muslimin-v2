"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoBook } from "react-icons/io5";

export function KahfReminder() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (new Date().getDay() === 5) setVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up-in max-w-[calc(100vw-2rem)] sm:max-w-sm">
      <div className="relative rounded-2xl bg-gradient-to-br from-[var(--color-accent-500)] to-[var(--color-accent-600)] text-[var(--color-primary-900)] py-4 pr-4 pl-9 shadow-2xl shadow-[var(--color-accent-700)]/30 ring-1 ring-white/30">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute top-1.5 left-1.5 p-1 rounded-full text-[var(--color-primary-900)]/70 hover:text-[var(--color-primary-900)] hover:bg-black/10 transition-colors"
          aria-label="إغلاق">
          <IoMdClose size={18} />
        </button>

        <Link href="/mushaf/18" className="group flex items-center gap-3">
          <span className="w-11 h-11 shrink-0 rounded-xl bg-[var(--color-primary-900)]/10 grid place-items-center">
            <IoBook size={22} />
          </span>
          <span className="min-w-0">
            <span className="block font-extrabold leading-tight">لا تنس قراءة سورة الكهف</span>
            <span className="block text-sm font-semibold text-[var(--color-primary-900)]/70 group-hover:text-[var(--color-primary-900)] underline-offset-4 group-hover:underline">اقرأها الآن ←</span>
          </span>
        </Link>
      </div>
    </div>
  );
}
