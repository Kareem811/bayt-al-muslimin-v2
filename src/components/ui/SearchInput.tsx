"use client";

import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { cn } from "@/lib/utils/cn";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "ابحث...",
  debounceMs = 200,
  className,
}: SearchInputProps) {
  const [internal, setInternal] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInternal(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    setInternal(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(next), debounceMs);
  };

  return (
    <label
      className={cn(
        "relative flex items-center gap-2 rounded-full bg-white shadow-sm",
        "border border-[var(--color-primary-200)]/50 px-4 py-3",
        "focus-within:ring-2 focus-within:ring-[var(--color-accent-400)]",
        className,
      )}
    >
      <CiSearch className="text-xl text-[var(--color-primary-700)]" />
      <input
        type="search"
        value={internal}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]"
      />
    </label>
  );
}
