"use client";

import { useEffect, useRef } from "react";

const IDLE_DELAY_MS = 700;

export function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleTimer: number | undefined;

    const playWhenAllowed = () => {
      if (motionPreference.matches || document.hidden) return;
      void video.play().catch(() => {
        // The poster remains visible if this browser blocks autoplay.
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      video.pause();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        idleTimer = undefined;
        playWhenAllowed();
      }, IDLE_DELAY_MS);
    };

    const onMotionChange = () => {
      if (motionPreference.matches) {
        window.clearTimeout(idleTimer);
        idleTimer = undefined;
        video.pause();
      } else if (idleTimer === undefined) {
        playWhenAllowed();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else if (idleTimer === undefined) playWhenAllowed();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    motionPreference.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    onMotionChange();

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("pointermove", onPointerMove);
      motionPreference.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="hero-image-wrap hero-film" aria-hidden="true">
      <video
        ref={videoRef}
        className="hero-film-video"
        src="/creator-hero.mp4"
        poster="/creator-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex={-1}
      />
    </div>
  );
}
