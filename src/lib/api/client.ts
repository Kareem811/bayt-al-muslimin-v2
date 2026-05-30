import type { Surah, AyahWithTafseer, RandomAyah } from "@/types/quran";
import type { Reciter, ReciterDirectoryResponse } from "@/types/reciter";
import type { HadithApiResponse } from "@/types/hadith";
import type { PrayerTimings } from "@/types/prayer";

async function get<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  surahs: () => get<Surah[]>("/api/surahs"),
  surah: (id: string | number) => get<AyahWithTafseer[]>(`/api/surahs/${id}`),
  randomAyah: () => get<RandomAyah>("/api/random-ayah"),
  reciters: () => get<ReciterDirectoryResponse>("/api/reciters"),
  reciter: (id: string | number) => get<Reciter>(`/api/reciters/${id}`),
  hadith: (category: string, limit = 300) =>
    get<HadithApiResponse>(`/api/hadith/${category}?limit=${limit}`),
  prayerTimes: (city: string, country: string) =>
    get<PrayerTimings>(
      `/api/prayer-times?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`,
    ),
};
