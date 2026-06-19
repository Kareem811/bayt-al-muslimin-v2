"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { setCity, setFontScale, markHydrated } from "./slices/settingsSlice";
import { findCity } from "@/lib/constants/cities";

const CITY_STORAGE_KEY = "bayt-al-muslimin.city";
const FONT_STORAGE_KEY = "bayt-al-muslimin.fontScale";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;
    try {
      const stored = localStorage.getItem(CITY_STORAGE_KEY);
      if (stored) store.dispatch(setCity(findCity(stored)));
      const storedScale = localStorage.getItem(FONT_STORAGE_KEY);
      if (storedScale) store.dispatch(setFontScale(Number(storedScale)));
    } catch {
      /* ignore storage errors */
    }
    store.dispatch(markHydrated());

    const unsubscribe = store.subscribe(() => {
      const settings = store.getState().settings;
      try {
        localStorage.setItem(CITY_STORAGE_KEY, settings.city.slug);
        localStorage.setItem(FONT_STORAGE_KEY, String(settings.quranFontScale));
      } catch {
        /* ignore */
      }
    });
    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
