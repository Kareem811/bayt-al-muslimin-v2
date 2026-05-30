import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type { Surah } from "@/types/quran";

interface AlquranSurahListResponse {
  code: number;
  status: string;
  data: Surah[];
}

export async function GET() {
  try {
    const data = await fetchUpstream<AlquranSurahListResponse>(
      `${upstream.alquran()}/surah`,
      { revalidate: 86400 },
    );
    return NextResponse.json(data.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
