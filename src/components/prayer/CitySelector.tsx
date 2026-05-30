"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCity } from "@/store/slices/settingsSlice";
import { SUPPORTED_CITIES, findCity } from "@/lib/constants/cities";

export function CitySelector() {
  const city = useAppSelector((s) => s.settings.city);
  const dispatch = useAppDispatch();

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm font-medium text-[var(--color-primary-800)]">المدينة:</span>
      <select
        value={city.slug}
        onChange={(e) => dispatch(setCity(findCity(e.target.value)))}
        className="px-4 py-2 rounded-full bg-white border border-[var(--color-primary-200)]/60 text-[var(--color-ink)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-400)]"
      >
        {SUPPORTED_CITIES.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.arabicName}
          </option>
        ))}
      </select>
    </label>
  );
}
