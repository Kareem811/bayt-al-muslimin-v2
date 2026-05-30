import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { ReciterDirectory } from "@/components/quraa/ReciterDirectory";
import type { Reciter } from "@/types/reciter";

export const metadata = {
  title: "القراء",
};

interface ReciterListResponse {
  reciters: Reciter[];
}

async function getReciters(): Promise<Reciter[]> {
  const data = await fetchUpstream<ReciterListResponse>(
    `${upstream.mp3quran()}/reciters`,
    { revalidate: 3600 },
  );
  return [...data.reciters].sort((a, b) =>
    a.letter.localeCompare(b.letter, "ar"),
  );
}

export default async function QuraaPage() {
  const reciters = await getReciters();
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          القراء
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          اختر قارئك المفضّل واستمع لتلاواته الكاملة
        </p>
      </header>
      <ReciterDirectory reciters={reciters} />
    </section>
  );
}
