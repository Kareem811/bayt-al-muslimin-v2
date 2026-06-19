"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  IoBook,
  IoHome,
  IoPeopleSharp,
  IoTimeSharp,
  IoMenu,
  IoSparklesSharp,
  IoStarSharp,
  IoCompassSharp,
  IoChevronDown,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSpeakerNotes, MdPodcasts, MdTouchApp } from "react-icons/md";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

const PRIMARY_LINKS = [
  { href: "/", label: "الرئيسية", icon: IoHome, match: ["/"] },
  { href: "/mushaf", label: "المصحف", icon: IoBook, match: ["/mushaf"] },
  { href: "/quraa", label: "القراء", icon: IoPeopleSharp, match: ["/quraa"] },
  { href: "/hadith", label: "الأحاديث", icon: MdSpeakerNotes, match: ["/hadith"] },
  { href: "/prayer-times", label: "مواقيت الصلاة", icon: IoTimeSharp, match: ["/prayer-times"] },
];

const MORE_LINKS = [
  { href: "/podcast", label: "بودكاست", icon: MdPodcasts, match: ["/podcast"] },
  { href: "/adhkar", label: "الأذكار", icon: IoSparklesSharp, match: ["/adhkar"] },
  { href: "/tasbeeh", label: "المسبحة", icon: MdTouchApp, match: ["/tasbeeh"] },
  { href: "/asma-allah", label: "أسماء الله الحسنى", icon: IoStarSharp, match: ["/asma-allah"] },
  { href: "/qibla", label: "اتجاه القبلة", icon: IoCompassSharp, match: ["/qibla"] },
];

const ALL_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [moreOpen]);

  const isActive = (matches: string[]) =>
    matches.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));

  const moreActive = MORE_LINKS.some((l) => isActive(l.match));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[var(--color-primary-900)]/90 backdrop-blur-md shadow-lg shadow-[var(--color-primary-900)]/20"
            : "bg-[var(--color-primary-900)]",
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-accent-500)] font-extrabold text-xl"
          >
            <span className="text-gradient-gold tracking-tight">بيت المسلمين</span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {PRIMARY_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.match);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all",
                      active
                        ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)]"
                        : "text-white/85 hover:text-white hover:bg-white/10",
                    )}
                  >
                    <Icon className="text-base" />
                    <span className="hidden lg:inline">{link.label}</span>
                  </Link>
                </li>
              );
            })}

            <li className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-haspopup="menu"
                className={cn(
                  "flex items-center gap-2 px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all",
                  moreActive
                    ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)]"
                    : "text-white/85 hover:text-white hover:bg-white/10",
                )}
              >
                <IoEllipsisHorizontal className="text-base" />
                <span className="hidden lg:inline">المزيد</span>
                <IoChevronDown
                  className={cn("text-xs transition-transform", moreOpen && "rotate-180")}
                />
              </button>

              {moreOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-2 w-56 rounded-2xl glass-dark shadow-2xl p-2 z-50"
                >
                  {MORE_LINKS.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.match);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setMoreOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                          active
                            ? "bg-[var(--color-accent-500)] text-[var(--color-primary-900)]"
                            : "text-white/85 hover:text-white hover:bg-white/10",
                        )}
                      >
                        <Icon size={18} />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-[var(--color-accent-500)] p-2"
            aria-label="فتح القائمة"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <IoMdCloseCircle size={28} /> : <IoMenu size={28} />}
          </button>
        </nav>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={ALL_LINKS}
        isActive={isActive}
      />
    </>
  );
}
