import { cn } from "@/lib/utils/cn";

interface PrayerCardProps {
  name: string;
  time?: string;
  highlight?: boolean;
}

export function PrayerCard({ name, time, highlight }: PrayerCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-4 md:p-5 text-center transition-all",
        highlight
          ? "bg-gradient-to-br from-[var(--color-accent-500)] to-[var(--color-accent-400)] text-[var(--color-primary-900)] shadow-lg"
          : "glass text-[var(--color-primary-800)]",
      )}
    >
      <div className="text-xs md:text-sm font-medium opacity-80 mb-1">{name}</div>
      <div className="text-lg md:text-2xl font-bold tracking-tight">
        {time ?? "—"}
      </div>
    </div>
  );
}
