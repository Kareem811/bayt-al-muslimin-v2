import { CollectionGrid } from "@/components/hadith/CollectionGrid";

export const metadata = {
  title: "الأحاديث النبوية",
};

export default function HadithPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          الأحاديث النبوية الشريفة
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          تصفّح أمهات كتب الحديث الشريف عند أهل السنّة
        </p>
      </header>
      <CollectionGrid />
    </section>
  );
}
