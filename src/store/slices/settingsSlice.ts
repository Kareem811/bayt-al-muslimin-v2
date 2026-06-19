import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_CITY } from "@/lib/constants/cities";
import type { City } from "@/types/prayer";

export const FONT_SCALE_MIN = 0.8;
export const FONT_SCALE_MAX = 1.8;

export interface SettingsState {
  city: City;
  quranFontScale: number;
  hydrated: boolean;
}

const initialState: SettingsState = {
  city: DEFAULT_CITY,
  quranFontScale: 1,
  hydrated: false,
};

function clampScale(value: number): number {
  if (!Number.isFinite(value)) return 1;
  const rounded = Math.round(value * 10) / 10;
  return Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, rounded));
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    setFontScale(state, action: PayloadAction<number>) {
      state.quranFontScale = clampScale(action.payload);
    },
    markHydrated(state) {
      state.hydrated = true;
    },
  },
});

export const { setCity, setFontScale, markHydrated } = settingsSlice.actions;
export default settingsSlice.reducer;
