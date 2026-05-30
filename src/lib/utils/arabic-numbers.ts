const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

export function toArabicNumerals(input: number | string): string {
  return String(input).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);
}
