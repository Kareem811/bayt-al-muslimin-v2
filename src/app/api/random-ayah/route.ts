import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type { RandomAyah } from "@/types/quran";

interface AlquranSurahResponse {
  data: { number: number; numberOfAyahs: number };
}
interface AlquranAyahResponse {
  data: RandomAyah;
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const surahNumber = Math.floor(Math.random() * 114) + 1;
    const surah = await fetchUpstream<AlquranSurahResponse>(
      `${upstream.alquran()}/surah/${surahNumber}`,
      { revalidate: false },
    );
    const ayahNumber = Math.floor(Math.random() * surah.data.numberOfAyahs) + 1;
    const ayah = await fetchUpstream<AlquranAyahResponse>(
      `${upstream.alquran()}/ayah/${surahNumber}:${ayahNumber}`,
      { revalidate: false },
    );
    return NextResponse.json(ayah.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
