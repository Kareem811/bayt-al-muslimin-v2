"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { IoMdSkipBackward, IoMdSkipForward, IoMdCloseCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { playIndex, stop } from "@/store/slices/audioSlice";

const H5AudioPlayer = dynamic(() => import("react-h5-audio-player"), {
  ssr: false,
});

import "react-h5-audio-player/lib/styles.css";

export function AudioPlayer() {
  const audio = useAppSelector((s) => s.audio);
  const dispatch = useAppDispatch();
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (audio.src && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [audio.src]);

  if (!audio.src) return null;

  const hasPrev = audio.index > 0;
  const hasNext = audio.index >= 0 && audio.index < audio.queue.length - 1;

  return (
    <div ref={playerRef} className="sticky bottom-0 inset-x-0 z-40 glass-dark border-t border-white/10" role="region" aria-label="مشغل الصوت">
      <button type="button" onClick={() => dispatch(stop())} className="md:hidden absolute top-2 left-2 z-10 p-1.5 rounded-full text-white/90 hover:text-red-400" aria-label="إيقاف التشغيل">
        <IoMdCloseCircle size={26} />
      </button>

      <div className="mx-auto max-w-7xl py-3 pr-4 pl-12 md:px-8 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-500)] grid place-items-center text-[var(--color-primary-900)] font-bold shrink-0">▶</div>
          <div className="min-w-0">
            <div className="text-white font-semibold truncate">{audio.title}</div>
            <div className="text-white/60 text-xs truncate">{audio.subtitle}</div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <H5AudioPlayer src={audio.src} autoPlay showSkipControls={false} showJumpControls={false} customAdditionalControls={[]} customVolumeControls={[]} layout="horizontal-reverse" onEnded={() => hasNext && dispatch(playIndex(audio.index + 1))} />
        </div>

        <div className="flex items-center gap-1 md:gap-2 justify-center">
          <button
            type="button"
            onClick={() => hasPrev && dispatch(playIndex(audio.index - 1))}
            disabled={!hasPrev}
            className="p-2 rounded-full text-white/90 hover:text-[var(--color-accent-300)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="السابق">
            <IoMdSkipForward size={22} />
          </button>
          <button
            type="button"
            onClick={() => hasNext && dispatch(playIndex(audio.index + 1))}
            disabled={!hasNext}
            className="p-2 rounded-full text-white/90 hover:text-[var(--color-accent-300)] disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="التالي">
            <IoMdSkipBackward size={22} />
          </button>
          <button type="button" onClick={() => dispatch(stop())} className="hidden md:inline-flex p-2 rounded-full text-white/90 hover:text-red-400" aria-label="إيقاف التشغيل">
            <IoMdCloseCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
