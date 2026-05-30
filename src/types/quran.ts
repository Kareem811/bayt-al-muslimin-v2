export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface AyahWithTafseer {
  id: string;
  sura: string;
  aya: string;
  arabic_text: string;
  translation: string;
  footnotes?: string;
}

export interface RandomAyah {
  number: number;
  text: string;
  numberInSurah: number;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}
