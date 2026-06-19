import { AsmaGrid } from "@/components/asma/AsmaGrid";

export const metadata = {
  title: "أسماء الله الحسنى",
};

export default function AsmaAllahPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          أسماء الله الحسنى
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          ﴿وَلِلَّهِ الْأَسْمَاءُ الْحُسْنَىٰ فَادْعُوهُ بِهَا﴾
        </p>
      </header>
      <AsmaGrid />
    </section>
  );
}
