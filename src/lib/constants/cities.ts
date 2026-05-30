import type { City } from "@/types/prayer";

export const SUPPORTED_CITIES: readonly City[] = [
  { slug: "cairo-eg", city: "cairo", country: "egypt", arabicName: "القاهرة" },
  { slug: "alexandria-eg", city: "alexandria", country: "egypt", arabicName: "الإسكندرية" },
  { slug: "giza-eg", city: "giza", country: "egypt", arabicName: "الجيزة" },
  { slug: "mecca-sa", city: "mecca", country: "saudi arabia", arabicName: "مكة المكرمة" },
  { slug: "medina-sa", city: "medina", country: "saudi arabia", arabicName: "المدينة المنورة" },
  { slug: "riyadh-sa", city: "riyadh", country: "saudi arabia", arabicName: "الرياض" },
  { slug: "jeddah-sa", city: "jeddah", country: "saudi arabia", arabicName: "جدة" },
  { slug: "dubai-ae", city: "dubai", country: "united arab emirates", arabicName: "دبي" },
  { slug: "abudhabi-ae", city: "abu dhabi", country: "united arab emirates", arabicName: "أبوظبي" },
  { slug: "doha-qa", city: "doha", country: "qatar", arabicName: "الدوحة" },
  { slug: "kuwait-kw", city: "kuwait city", country: "kuwait", arabicName: "مدينة الكويت" },
  { slug: "manama-bh", city: "manama", country: "bahrain", arabicName: "المنامة" },
  { slug: "muscat-om", city: "muscat", country: "oman", arabicName: "مسقط" },
  { slug: "amman-jo", city: "amman", country: "jordan", arabicName: "عمّان" },
  { slug: "beirut-lb", city: "beirut", country: "lebanon", arabicName: "بيروت" },
  { slug: "damascus-sy", city: "damascus", country: "syria", arabicName: "دمشق" },
  { slug: "baghdad-iq", city: "baghdad", country: "iraq", arabicName: "بغداد" },
  { slug: "rabat-ma", city: "rabat", country: "morocco", arabicName: "الرباط" },
  { slug: "casablanca-ma", city: "casablanca", country: "morocco", arabicName: "الدار البيضاء" },
  { slug: "tunis-tn", city: "tunis", country: "tunisia", arabicName: "تونس" },
  { slug: "algiers-dz", city: "algiers", country: "algeria", arabicName: "الجزائر" },
  { slug: "istanbul-tr", city: "istanbul", country: "turkey", arabicName: "إسطنبول" },
  { slug: "ankara-tr", city: "ankara", country: "turkey", arabicName: "أنقرة" },
  { slug: "khartoum-sd", city: "khartoum", country: "sudan", arabicName: "الخرطوم" },
  { slug: "sanaa-ye", city: "sanaa", country: "yemen", arabicName: "صنعاء" },
  { slug: "tripoli-ly", city: "tripoli", country: "libya", arabicName: "طرابلس" },
  { slug: "london-gb", city: "london", country: "united kingdom", arabicName: "لندن" },
  { slug: "paris-fr", city: "paris", country: "france", arabicName: "باريس" },
  { slug: "berlin-de", city: "berlin", country: "germany", arabicName: "برلين" },
  { slug: "newyork-us", city: "new york", country: "united states", arabicName: "نيويورك" },
] as const;

export const DEFAULT_CITY: City = SUPPORTED_CITIES[0];

export function findCity(citySlug: string | null | undefined): City {
  if (!citySlug) return DEFAULT_CITY;
  return SUPPORTED_CITIES.find((c) => c.slug === citySlug) ?? DEFAULT_CITY;
}
