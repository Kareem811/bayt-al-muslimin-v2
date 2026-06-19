import { TasbeehCounter } from "@/components/tasbeeh/TasbeehCounter";

export const metadata = {
  title: "المسبحة",
};

export default function TasbeehPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          المسبحة
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          سبّح واذكر الله — يُحفظ عدّك تلقائياً على جهازك
        </p>
      </header>
      <TasbeehCounter />
    </section>
  );
}
