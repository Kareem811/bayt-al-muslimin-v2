"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { IoMdSkipBackward, IoMdSkipForward, IoMdCloseCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { play, stop } from "@/store/slices/audioSlice";
import { setCurrentIndex } from "@/store/slices/reciterSlice";

const H5AudioPlayer = dynamic(() => import("react-h5-audio-player"), {
  ssr: false,
});

import "react-h5-audio-player/lib/styles.css";

export function AudioPlayer() {
  const audio = useAppSelector((s) => s.audio);
  const reciter = useAppSelector((s) => s.reciter);
  const dispatch = useAppDispatch();
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (audio.src && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [audio.src]);

  if (!audio.src) return null;

  const hasPrev = reciter.currentIndex > 0;
  const hasNext =
    reciter.currentIndex >= 0 &&
    reciter.currentIndex < reciter.playlist.length - 1;

  const goTo = (index: number) => {
    const item = reciter.playlist[index];
    if (!item || !reciter.current) return;
    dispatch(setCurrentIndex(index));
    dispatch(
      play({
        src: item.audioUrl,
        title: `سورة ${item.name}`,
        subtitle: `الشيخ ${reciter.current.name}`,
      }),
    );
  };

  return (
    <div
      ref={playerRef}
      className="sticky bottom-0 inset-x-0 z-40 glass-dark border-t border-white/10"
      role="region"
      aria-label="مشغل الصوت"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-500)] grid place-items-center text-[var(--color-primary-900)] font-bold shrink-0">
            ▶
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{audio.title}</div>
            <div className="text-white/60 text-xs truncate">{audio.subtitle}</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <H5AudioPlayer
            src={audio.src}
            autoPlay
            showSkipControls={false}
            showJumpControls={false}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            layout="horizontal-reverse"
          />
        </div>

        <div className="flex items-center gap-1 md:gap-2 justify-center">
          <button
            type="button"
            onClick={() => hasPrev && goTo(reciter.currentIndex - 1)}
            disabled={!hasPrev}
            className="p-2 rounded-full text-white/90 hover:text-[var(--color-accent-300)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="السورة السابقة"
          >
            <IoMdSkipForward size={22} />
          </button>
          <button
            type="button"
            onClick={() => hasNext && goTo(reciter.currentIndex + 1)}
            disabled={!hasNext}
            className="p-2 rounded-full text-white/90 hover:text-[var(--color-accent-300)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="السورة التالية"
          >
            <IoMdSkipBackward size={22} />
          </button>
          <button
            type="button"
            onClick={() => dispatch(stop())}
            className="p-2 rounded-full text-white/90 hover:text-red-400"
            aria-label="إيقاف التشغيل"
          >
            <IoMdCloseCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
