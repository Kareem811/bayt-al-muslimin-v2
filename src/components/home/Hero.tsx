import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/hero.webp"
          alt=""
          aria-hidden
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-900)]/85 via-[var(--color-primary-800)]/75 to-[var(--color-primary-900)]/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28 lg:py-32 text-center">
        <p className="text-[var(--color-accent-300)] tracking-widest mb-3 text-sm md:text-base">
          ﷽
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          مرحباً بك في{" "}
          <span className="text-gradient-gold">بيت المسلمين</span>
        </h1>
        <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          منصة شاملة لقراءة القرآن الكريم مع التفسير، تلاوات نخبة من القراء، الأحاديث
          النبوية الشريفة، ومواقيت الصلاة في مدينتك.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/mushaf"
            className="px-6 py-3 rounded-full bg-[var(--color-accent-500)] text-[var(--color-primary-900)] font-bold hover:bg-[var(--color-accent-400)] transition-colors"
          >
            ابدأ القراءة
          </Link>
          <Link
            href="/quraa"
            className="px-6 py-3 rounded-full glass text-white border-white/30 hover:bg-white/15 transition-colors"
          >
            استمع للقرآن
          </Link>
        </div>
      </div>
    </section>
  );
}
