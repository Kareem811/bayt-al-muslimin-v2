"use client";

import { useEffect } from "react";

export const LAST_READ_KEY = "bayt-al-muslimin.lastRead";

export function RecordLastRead({ id, name }: { id: number; name: string }) {
  useEffect(() => {
    try {
      localStorage.setItem(LAST_READ_KEY, JSON.stringify({ id, name }));
    } catch {
      /* تجاهل */
    }
  }, [id, name]);
  return null;
}
