import Link from "next/link";
import { IoMicSharp } from "react-icons/io5";
import type { Reciter } from "@/types/reciter";

export function ReciterCard({ reciter }: { reciter: Reciter }) {
  const rewayatCount = reciter.moshaf?.length ?? 0;
  return (
    <Link
      href={`/quraa/${reciter.id}`}
      className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-lg hover:shadow-[var(--color-primary-800)]/5 transition-all"
    >
      <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-[var(--color-accent-300)] grid place-items-center">
        <IoMicSharp size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[var(--color-primary-800)] truncate">
          {reciter.name}
        </h3>
        <p className="text-xs text-[var(--color-ink-muted)]">
          {rewayatCount > 0 && `${rewayatCount} رواية`}
        </p>
      </div>
    </Link>
  );
}
