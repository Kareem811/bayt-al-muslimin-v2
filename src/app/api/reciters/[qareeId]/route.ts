import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type { Reciter } from "@/types/reciter";

interface SingleReciterResponse {
  reciters: Reciter[];
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ qareeId: string }> },
) {
  const { qareeId } = await context.params;
  const id = Number(qareeId);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid reciter id" }, { status: 400 });
  }

  try {
    const data = await fetchUpstream<SingleReciterResponse>(
      `${upstream.mp3quran()}/reciters?reciter=${id}`,
      { revalidate: 3600 },
    );
    const reciter = data.reciters?.[0];
    if (!reciter) {
      return NextResponse.json({ error: "Reciter not found" }, { status: 404 });
    }
    return NextResponse.json(reciter);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
