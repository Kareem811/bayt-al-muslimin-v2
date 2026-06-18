"use client";

import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";
import { cn } from "@/lib/utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/** Builds a compact page list with ellipses, e.g. [1, "…", 4, 5, 6, "…", 12]. */
function pageItems(page: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const items: (number | "…")[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(total - 1, page + 1);
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const go = (p: number) => onChange(Math.min(Math.max(1, p), totalPages));

  const baseBtn =
    "min-w-9 h-9 px-2 grid place-items-center rounded-full text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed";

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-1.5"
      aria-label="ترقيم الصفحات"
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className={cn(baseBtn, "text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)]")}
        aria-label="الصفحة السابقة"
      >
        <IoChevronForward size={18} />
      </button>

      {pageItems(page, totalPages).map((item, idx) =>
        item === "…" ? (
          <span
            key={`gap-${idx}`}
            className="min-w-9 h-9 grid place-items-center text-[var(--color-ink-muted)]"
            aria-hidden
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              baseBtn,
              item === page
                ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)] shadow"
                : "text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)]",
            )}
          >
            {toArabicNumerals(item)}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className={cn(baseBtn, "text-[var(--color-primary-700)] hover:bg-[var(--color-primary-100)]")}
        aria-label="الصفحة التالية"
      >
        <IoChevronBack size={18} />
      </button>
    </nav>
  );
}
