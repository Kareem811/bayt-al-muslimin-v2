import type { HadithCollection } from "@/types/hadith";

export const HADITH_COLLECTIONS: readonly HadithCollection[] = [
  { name: "صحيح البخاري", slug: "bukhari" },
  { name: "صحيح مسلم", slug: "muslim" },
  { name: "سنن أبي داوود", slug: "abu-dawud" },
  { name: "جامع الترمذي", slug: "tirmidzi" },
  { name: "سنن النسائي", slug: "nasai" },
  { name: "سنن ابن ماجه", slug: "ibnu-majah" },
  { name: "مسند أحمد", slug: "ahmad" },
  { name: "موطأ مالك", slug: "malik" },
  { name: "سنن الدارمي", slug: "darimi" },
] as const;

export function getCollectionName(slug: string): string {
  return HADITH_COLLECTIONS.find((c) => c.slug === slug)?.name ?? slug;
}
