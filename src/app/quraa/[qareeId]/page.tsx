import { notFound } from "next/navigation";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import { ReciterPlayer } from "@/components/quraa/ReciterPlayer";
import type { Reciter, RecitedSurah } from "@/types/reciter";

interface ReciterResponse {
  reciters: Reciter[];
}
interface SuwarResponse {
  suwar: RecitedSurah[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ qareeId: string }>;
}) {
  const { qareeId } = await params;
  try {
    const data = await fetchUpstream<ReciterResponse>(
      `${upstream.mp3quran()}/reciters?reciter=${qareeId}`,
      { revalidate: 3600 },
    );
    const name = data.reciters?.[0]?.name;
    return { title: name ? `الشيخ ${name}` : "القارئ" };
  } catch {
    return { title: "القارئ" };
  }
}

async function getData(
  qareeId: string,
): Promise<{ reciter: Reciter; suwar: RecitedSurah[] } | null> {
  const base = upstream.mp3quran();
  const [reciterRes, suwarRes] = await Promise.all([
    fetchUpstream<ReciterResponse>(`${base}/reciters?reciter=${qareeId}`, {
      revalidate: 3600,
    }),
    fetchUpstream<SuwarResponse>(`${base}/suwar`, { revalidate: 86400 }),
  ]);
  const reciter = reciterRes.reciters?.[0];
  if (!reciter) return null;
  return { reciter, suwar: suwarRes.suwar };
}

export default async function SingleQarePage({
  params,
}: {
  params: Promise<{ qareeId: string }>;
}) {
  const { qareeId } = await params;
  if (!Number.isFinite(Number(qareeId))) notFound();

  const data = await getData(qareeId);
  if (!data) notFound();

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-10 md:py-14">
      <ReciterPlayer reciter={data.reciter} suwar={data.suwar} />
    </section>
  );
}
