import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream } from "@/lib/api/endpoints";
import type { HadithApiResponse } from "@/types/hadith";

const VALID = new Set([
  "abu-dawud",
  "ahmad",
  "bukhari",
  "darimi",
  "ibnu-majah",
  "malik",
  "muslim",
  "nasai",
  "tirmidzi",
]);

export async function GET(
  req: Request,
  context: { params: Promise<{ category: string }> },
) {
  const { category } = await context.params;
  if (!VALID.has(category)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 400 });
  }

  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit") ?? "300");
  const page = Number(url.searchParams.get("page") ?? "1");

  try {
    const data = await fetchUpstream<HadithApiResponse>(
      `${upstream.hadith()}/hadith/${category}?page=${page}&limit=${limit}`,
      { revalidate: 86400 },
    );
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
