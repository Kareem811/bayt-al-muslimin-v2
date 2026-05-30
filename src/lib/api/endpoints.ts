function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const upstream = {
  alquran: () => required("ALQURAN_API_BASE"),
  quranenc: () => required("QURANENC_API_BASE"),
  mp3quran: () => required("MP3QURAN_API_BASE"),
  hadith: () => required("HADITH_API_BASE"),
  aladhan: () => required("ALADHAN_API_BASE"),
};

export const publicConfig = {
  defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY ?? "cairo",
  defaultCountry: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY ?? "egypt",
  prayerMethod: process.env.NEXT_PUBLIC_PRAYER_METHOD ?? "8",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "بيت المسلمين",
};
