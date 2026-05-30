import { PrayerTimesPanel } from "@/components/prayer/PrayerTimesPanel";

export const metadata = {
  title: "مواقيت الصلاة",
};

export default function PrayerTimesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          مواقيت الصلاة اليوم
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          اختر مدينتك واعرف مواعيد الصلوات الخمس
        </p>
      </header>
      <PrayerTimesPanel variant="full" />
    </section>
  );
}
