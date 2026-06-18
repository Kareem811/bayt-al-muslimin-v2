import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { RadioDirectory } from "@/components/podcast/RadioDirectory";
import type { Radio } from "@/types/radio";

export const metadata = {
  title: "بودكاست",
};

interface RadioListResponse {
  radios: Radio[];
}

async function getRadios(): Promise<Radio[]> {
  const data = await fetchUpstream<RadioListResponse>(
    `${upstream.mp3quran()}/radios?language=ar`,
    { revalidate: 3600 },
  );
  return data.radios.map((r) => ({ ...r, name: r.name.trim() }));
}

export default async function PodcastPage() {
  const radios = await getRadios();
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary-800)] mb-2">
          بودكاست
        </h1>
        <p className="text-[var(--color-ink-muted)]">
          إذاعات القرآن الكريم بثًّا مباشرًا على مدار الساعة
        </p>
      </header>
      <RadioDirectory radios={radios} />
    </section>
  );
}
