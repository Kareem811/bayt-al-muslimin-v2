"use client";

import { useEffect, useRef, useState } from "react";
import { IoLocate, IoCompass, IoRefresh } from "react-icons/io5";
import { toArabicNumerals } from "@/lib/utils/arabic-numbers";

// إحداثيات الكعبة المشرّفة
const KAABA = { lat: 21.4225, lng: 39.8262 };
// افتراضي (القاهرة) عند تعذّر تحديد الموقع
const FALLBACK = { lat: 30.0444, lng: 31.2357 };

const toRad = (d: number) => (d * Math.PI) / 180;
const toDeg = (r: number) => (r * 180) / Math.PI;

function qiblaBearing(lat: number, lng: number): number {
  const φ1 = toRad(lat);
  const φ2 = toRad(KAABA.lat);
  const Δλ = toRad(KAABA.lng - lng);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

type Status = "locating" | "ready" | "fallback";
type LiveState = "off" | "on" | "unsupported";

interface OrientationEventiOS extends DeviceOrientationEvent {
  webkitCompassHeading?: number;
}

export function QiblaCompass() {
  const [coords, setCoords] = useState(FALLBACK);
  const [status, setStatus] = useState<Status>("locating");
  const [heading, setHeading] = useState<number | null>(null);
  const [live, setLive] = useState<LiveState>("off");
  const headingRef = useRef(false);

  const locate = () => {
    setStatus("locating");
    if (!navigator.geolocation) {
      setStatus("fallback");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("ready");
      },
      () => setStatus("fallback"),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  useEffect(() => {
    const id = requestAnimationFrame(locate);
    return () => cancelAnimationFrame(id);
  }, []);

  const qibla = qiblaBearing(coords.lat, coords.lng);

  const enableLive = async () => {
    const DOE = window.DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    try {
      if (typeof DOE?.requestPermission === "function") {
        const res = await DOE.requestPermission();
        if (res !== "granted") {
          setLive("unsupported");
          return;
        }
      }
    } catch {
      setLive("unsupported");
      return;
    }

    const handler = (e: OrientationEventiOS) => {
      const h =
        typeof e.webkitCompassHeading === "number"
          ? e.webkitCompassHeading
          : e.alpha != null
            ? 360 - e.alpha
            : null;
      if (h != null) {
        headingRef.current = true;
        setHeading((h + 360) % 360);
      }
    };
    window.addEventListener("deviceorientationabsolute", handler as EventListener);
    window.addEventListener("deviceorientation", handler as EventListener);
    setLive("on");

    // إن لم تصل بيانات من حسّاس الاتجاه خلال ثوانٍ، فالجهاز لا يدعمها (الحاسوب غالباً)
    window.setTimeout(() => {
      if (!headingRef.current) {
        window.removeEventListener("deviceorientationabsolute", handler as EventListener);
        window.removeEventListener("deviceorientation", handler as EventListener);
        setLive("unsupported");
      }
    }, 2500);
  };

  const liveActive = live === "on" && heading != null;
  const roseRot = liveActive ? -(heading as number) : 0;
  const needleRot = liveActive ? qibla - (heading as number) : qibla;

  return (
    <div className="max-w-md mx-auto text-center">
      <p className="text-[var(--color-ink-muted)] mb-6 flex items-center justify-center gap-2">
        <IoLocate size={18} className="text-[var(--color-accent-600)]" />
        {status === "locating" && "جارٍ تحديد موقعك…"}
        {status === "ready" && "تم تحديد موقعك بدقّة"}
        {status === "fallback" && "تعذّر تحديد موقعك — نعرض اتجاهاً تقريبياً من القاهرة"}
      </p>

      {/* البوصلة */}
      <div className="relative mx-auto w-72 h-72 rounded-full bg-gradient-to-b from-white to-[var(--color-primary-50)] border-4 border-[var(--color-primary-100)] shadow-lg">
        {/* وردة الاتجاهات */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `rotate(${roseRot}deg)` }}
        >
          <span className="absolute top-2 left-1/2 -translate-x-1/2 font-bold text-[var(--color-primary-700)]">ش</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-bold text-[var(--color-ink-muted)]">ج</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 font-bold text-[var(--color-ink-muted)]">ق</span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 font-bold text-[var(--color-ink-muted)]">غ</span>
        </div>

        {/* إبرة القبلة (تشير لأعلى = شمال عند الصفر) */}
        <svg
          viewBox="0 0 288 288"
          className="absolute inset-0 w-full h-full transition-transform duration-300"
          style={{ transform: `rotate(${needleRot}deg)` }}
          aria-hidden
        >
          {/* النصف المتجه للقبلة */}
          <polygon points="144,38 132,148 156,148" fill="var(--color-accent-500)" />
          {/* الذيل */}
          <polygon points="144,250 132,148 156,148" fill="var(--color-primary-200)" />
        </svg>

        {/* رمز الكعبة عند طرف الإبرة (يبقى منتصباً) */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: `rotate(${needleRot}deg)` }}
        >
          <div
            className="absolute top-1 left-1/2 -translate-x-1/2 text-2xl"
            style={{ transform: `rotate(${-needleRot}deg)` }}
          >
            🕋
          </div>
        </div>

        {/* المركز */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[var(--color-primary-800)] border-2 border-white shadow" />
      </div>

      <div className="mt-6">
        <div className="text-3xl font-extrabold text-[var(--color-primary-800)]">
          {toArabicNumerals(Math.round(qibla))}°
        </div>
        <div className="text-sm text-[var(--color-ink-muted)]">اتجاه القبلة من الشمال</div>
      </div>

      {/* أزرار وإرشادات */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {live !== "on" && (
          <button
            type="button"
            onClick={enableLive}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-primary-700)] text-white font-bold hover:bg-[var(--color-primary-800)] transition-colors"
          >
            <IoCompass size={20} />
            تفعيل البوصلة الحيّة
          </button>
        )}
        {status === "fallback" && (
          <button
            type="button"
            onClick={locate}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-accent-500)] text-[var(--color-primary-900)] font-bold hover:brightness-105 transition"
          >
            <IoRefresh size={20} />
            إعادة تحديد موقعي
          </button>
        )}
      </div>

      {live === "on" && (
        <p className="mt-4 text-sm text-[var(--color-primary-700)] bg-[var(--color-primary-50)] rounded-2xl px-4 py-3">
          حرّك جهازك حتى يشير السهم الذهبي نحو 🕋 — البوصلة تتبع اتجاهك الآن.
        </p>
      )}
      {live === "unsupported" && (
        <p className="mt-4 text-sm text-[var(--color-ink-muted)] bg-[var(--color-primary-50)] rounded-2xl px-4 py-3">
          البوصلة الحيّة تحتاج جهازاً بحسّاس اتجاه (هاتف). على الحاسوب: وجّه أعلى الشاشة نحو
          الشمال، والسهم الذهبي يشير إلى القبلة.
        </p>
      )}
      {live === "off" && (
        <p className="mt-4 text-xs text-[var(--color-ink-muted)]">
          وجّه أعلى الجهاز نحو الشمال، ويشير السهم الذهبي إلى القبلة — أو فعّل البوصلة الحيّة على الهاتف.
        </p>
      )}
    </div>
  );
}
