"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { setCity, markHydrated } from "./slices/settingsSlice";
import { findCity } from "@/lib/constants/cities";

const CITY_STORAGE_KEY = "bayt-al-muslimin.city";

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
    } catch {
      /* ignore storage errors */
    }
    store.dispatch(markHydrated());

    const unsubscribe = store.subscribe(() => {
      const city = store.getState().settings.city;
      try {
        localStorage.setItem(CITY_STORAGE_KEY, city.slug);
      } catch {
        /* ignore */
      }
    });
    return () => unsubscribe();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
