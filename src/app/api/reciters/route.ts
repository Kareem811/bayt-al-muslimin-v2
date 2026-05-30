import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type {
  Reciter,
  RecitedSurah,
  ReciterDirectoryResponse,
} from "@/types/reciter";

interface ReciterListResponse {
  reciters: Reciter[];
}
interface SuwarResponse {
  suwar: RecitedSurah[];
}

export async function GET() {
  try {
    const base = upstream.mp3quran();
    const [reciterRes, suwarRes] = await Promise.all([
      fetchUpstream<ReciterListResponse>(`${base}/reciters`, { revalidate: 3600 }),
      fetchUpstream<SuwarResponse>(`${base}/suwar`, { revalidate: 86400 }),
    ]);
    const sorted = [...reciterRes.reciters].sort((a, b) =>
      a.letter.localeCompare(b.letter, "ar"),
    );
    const response: ReciterDirectoryResponse = {
      reciters: sorted,
      suwar: suwarRes.suwar,
    };
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
