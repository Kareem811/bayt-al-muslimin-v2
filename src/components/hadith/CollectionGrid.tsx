import Link from "next/link";
import { MdSpeakerNotes } from "react-icons/md";
import { HADITH_COLLECTIONS } from "@/lib/constants/hadith-collections";

export function CollectionGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {HADITH_COLLECTIONS.map((c) => (
        <Link
          key={c.slug}
          href={`/hadith/${c.slug}`}
          className="group glass rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[var(--color-primary-800)]/10"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] text-[var(--color-accent-300)] grid place-items-center text-2xl mb-4 group-hover:scale-110 transition-transform">
            <MdSpeakerNotes />
          </div>
          <h3 className="text-lg font-bold text-[var(--color-primary-800)]">{c.name}</h3>
        </Link>
      ))}
    </div>
  );
}
