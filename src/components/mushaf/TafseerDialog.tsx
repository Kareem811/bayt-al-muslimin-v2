"use client";

import { useEffect, useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import type { AyahWithTafseer } from "@/types/quran";

interface TafseerDialogProps {
  ayah: AyahWithTafseer | null;
  onClose: () => void;
}

export function TafseerDialog({ ayah, onClose }: TafseerDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ayah) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [ayah, onClose]);

  if (!ayah) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tafseer-title"
    >
      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl bg-white shadow-2xl p-6 md:p-8 outline-none scrollbar-thin"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق التفسير"
          className="absolute top-4 left-4 text-[var(--color-primary-700)] hover:text-[var(--color-primary-900)]"
        >
          <IoMdCloseCircle size={30} />
        </button>
        <h2
          id="tafseer-title"
          className="text-gradient-gold font-extrabold text-2xl mb-2"
        >
          الآية رقم {toArabicNumerals(ayah.aya)}
        </h2>
        <p className="font-quran text-2xl md:text-3xl leading-loose text-[var(--color-primary-900)] mb-6">
          {ayah.arabic_text}
        </p>
        <div className="rounded-2xl bg-[var(--color-primary-50)] border border-[var(--color-primary-100)] p-5">
          <h3 className="text-sm font-bold text-[var(--color-primary-700)] mb-2">
            التفسير الميسر
          </h3>
          <p className="text-[var(--color-ink)] leading-loose">{ayah.translation}</p>
          {ayah.footnotes && (
            <p className="mt-3 text-sm text-[var(--color-ink-muted)] leading-relaxed">
              {ayah.footnotes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
