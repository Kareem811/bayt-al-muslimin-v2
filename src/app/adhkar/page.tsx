import { AdhkarRunner } from "@/components/adhkar/AdhkarRunner";

export const metadata = {
  title: "أذكار الصباح والمساء",
};

export default function AdhkarPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          أذكار الصباح والمساء
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          حصّن نفسك بأذكار اليوم والليلة — اضغط الدائرة للتكرار ثم انتقل للذكر التالي
        </p>
      </header>
      <AdhkarRunner />
    </section>
  );
}
