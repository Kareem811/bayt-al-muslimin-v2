import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type { AyahWithTafseer } from "@/types/quran";

interface QuranEncResponse {
  result: AyahWithTafseer[];
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ surahId: string }> },
) {
  const { surahId } = await context.params;
  const id = Number(surahId);
  if (!Number.isFinite(id) || id < 1 || id > 114) {
    return NextResponse.json({ error: "Invalid surah id" }, { status: 400 });
  }

  try {
    const data = await fetchUpstream<QuranEncResponse>(
      `${upstream.quranenc()}/translation/sura/arabic_moyassar/${id}`,
      { revalidate: 86400 },
    );
    return NextResponse.json(data.result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
