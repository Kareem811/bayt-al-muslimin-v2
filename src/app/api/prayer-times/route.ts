import { NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api/server";
import { upstream, publicConfig } from "@/lib/api/endpoints";
import { todayForAladhan } from "@/lib/utils/format-date";
import type { PrayerTimings } from "@/types/prayer";

interface AladhanResponse {
  data: {
    timings: PrayerTimings;
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const city = url.searchParams.get("city") ?? publicConfig.defaultCity;
  const country = url.searchParams.get("country") ?? publicConfig.defaultCountry;
  const method = url.searchParams.get("method") ?? publicConfig.prayerMethod;
  const today = todayForAladhan();

  try {
    const data = await fetchUpstream<AladhanResponse>(
      `${upstream.aladhan()}/timingsByCity/${today}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`,
      { revalidate: 3600 },
    );
    return NextResponse.json(data.data.timings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
