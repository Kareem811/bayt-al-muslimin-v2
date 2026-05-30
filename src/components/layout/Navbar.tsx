"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoBook, IoHome, IoPeopleSharp, IoTimeSharp, IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { MdSpeakerNotes } from "react-icons/md";
import { cn } from "@/lib/utils/cn";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/", label: "الرئيسية", icon: IoHome, match: ["/"] },
  { href: "/mushaf", label: "المصحف", icon: IoBook, match: ["/mushaf"] },
  { href: "/quraa", label: "القراء", icon: IoPeopleSharp, match: ["/quraa"] },
  { href: "/hadith", label: "الأحاديث", icon: MdSpeakerNotes, match: ["/hadith"] },
  { href: "/prayer-times", label: "مواقيت الصلاة", icon: IoTimeSharp, match: ["/prayer-times"] },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (matches: string[]) =>
    matches.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));

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
            {NAV_LINKS.map((link) => {
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
        links={NAV_LINKS}
        isActive={isActive}
      />
    </>
  );
}
