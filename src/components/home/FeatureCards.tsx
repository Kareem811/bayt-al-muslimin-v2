import Link from "next/link";
import { IoBook, IoPeopleSharp, IoTimeSharp } from "react-icons/io5";
import { MdSpeakerNotes } from "react-icons/md";
import type { IconType } from "react-icons";

interface Feature {
  label: string;
  href: string;
  Icon: IconType;
  description: string;
}

const FEATURES: Feature[] = [
  {
    label: "المصحف الشريف",
    href: "/mushaf",
    Icon: IoBook,
    description: "اقرأ القرآن الكريم مع التفسير الميسر لكل آية.",
  },
  {
    label: "القراء",
    href: "/quraa",
    Icon: IoPeopleSharp,
    description: "استمع لتلاوات نخبة من قراء العالم الإسلامي.",
  },
  {
    label: "مواقيت الصلاة",
    href: "/prayer-times",
    Icon: IoTimeSharp,
    description: "تعرّف على مواقيت الصلوات الخمس في مدينتك.",
  },
  {
    label: "الأحاديث النبوية",
    href: "/hadith",
    Icon: MdSpeakerNotes,
    description: "تصفّح أمهات كتب الحديث الشريف.",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          استكشف الأقسام
        </h2>
        <p className="text-[var(--color-ink-muted)]">كل ما تحتاجه لإثراء يومك الإيماني</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {FEATURES.map(({ label, href, Icon, description }) => (
          <Link
            key={href}
            href={href}
            className="group glass rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary-800)]/10"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-800)] text-[var(--color-accent-300)] grid place-items-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              <Icon />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-primary-800)] mb-1">{label}</h3>
            <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
