import { QiblaCompass } from "@/components/qibla/QiblaCompass";

export const metadata = {
  title: "اتجاه القبلة",
};

export default function QiblaPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          اتجاه القبلة
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          حدّد اتجاه الكعبة المشرّفة من موقعك الحالي
        </p>
      </header>
      <QiblaCompass />
    </section>
  );
}
