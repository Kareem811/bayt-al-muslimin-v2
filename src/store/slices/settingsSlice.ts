import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DEFAULT_CITY } from "@/lib/constants/cities";
import type { City } from "@/types/prayer";

export interface SettingsState {
  city: City;
  hydrated: boolean;
}

const initialState: SettingsState = {
  city: DEFAULT_CITY,
  hydrated: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<City>) {
      state.city = action.payload;
    },
    markHydrated(state) {
      state.hydrated = true;
    },
  },
});

export const { setCity, markHydrated } = settingsSlice.actions;
export default settingsSlice.reducer;
