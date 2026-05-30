"use client";

import Link from "next/link";
import { useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import type { IconType } from "react-icons";

interface MobileMenuLink {
  href: string;
  label: string;
  icon: IconType;
  match: string[];
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: MobileMenuLink[];
  isActive: (matches: string[]) => boolean;
}

export function MobileMenu({ open, onClose, links, isActive }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        className={cn(
          "md:hidden fixed bottom-0 right-0 left-0 z-50 glass-dark rounded-t-3xl shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto w-12 h-1.5 rounded-full bg-white/30 mt-3" aria-hidden />
        <ul className="grid grid-cols-2 gap-2 p-5 pb-8">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.match);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-4 py-4 rounded-2xl font-medium",
                    active
                      ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)]"
                      : "bg-white/5 text-white hover:bg-white/10",
                  )}
                >
                  <Icon size={22} />
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
