import Link from "next/link";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";

interface SurahCardProps {
  number: number;
  name: string;
  numberOfAyahs: number;
  revelationType?: "Meccan" | "Medinan";
}

export function SurahCard({ number, name, numberOfAyahs, revelationType }: SurahCardProps) {
  const ayahLabel = numberOfAyahs <= 10 ? "آيات" : "آية";
  const revText =
    revelationType === "Meccan" ? "مكية" : revelationType === "Medinan" ? "مدنية" : null;

  return (
    <Link
      href={`/mushaf/${number}`}
      className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[var(--color-primary-100)] hover:border-[var(--color-accent-400)] hover:shadow-lg hover:shadow-[var(--color-primary-800)]/5 transition-all"
    >
      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[var(--color-primary-700)] to-[var(--color-primary-900)] text-[var(--color-accent-300)] grid place-items-center font-bold text-sm">
        {toArabicNumerals(number)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-lg text-[var(--color-primary-800)] truncate">{name}</h3>
        <div className="text-xs text-[var(--color-ink-muted)] flex items-center gap-2">
          <span>{toArabicNumerals(numberOfAyahs)} {ayahLabel}</span>
          {revText && (
            <>
              <span aria-hidden>•</span>
              <span>{revText}</span>
            </>
          )}
        </div>
      </div>
      <span
        aria-hidden
        className="text-[var(--color-accent-500)] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        ←
      </span>
    </Link>
  );
}
