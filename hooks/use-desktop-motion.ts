"use client";

import { useEffect } from "react";

export function useDesktopMotion() {
  useEffect(() => {
    const desktopMotion = window.matchMedia(
      "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
    );
    if (!desktopMotion.matches) return;

    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>(".hero-section");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>(".motion-reveal"),
    );

    // Show anything already in the first viewport before enabling reveal styles.
    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.92) {
        item.classList.add("is-visible");
      }
    });
    root.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    let scrollFrame = 0;
    const paintScroll = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      root.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, window.scrollY / maxScroll)),
      );
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(paintScroll);
    };
    paintScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onHeroMove = (event: PointerEvent) => {
      if (!hero || event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      hero.style.setProperty("--cursor-x", `${(x * 100).toFixed(1)}%`);
      hero.style.setProperty("--cursor-y", `${(y * 100).toFixed(1)}%`);
    };
    const onHeroLeave = () => {
      hero?.style.setProperty("--cursor-x", "65%");
      hero?.style.setProperty("--cursor-y", "42%");
    };
    hero?.addEventListener("pointermove", onHeroMove);
    hero?.addEventListener("pointerleave", onHeroLeave);

    const tiltCleanups = Array.from(
      document.querySelectorAll<HTMLElement>(".tilt-card"),
    ).map((card) => {
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        card.style.setProperty("--shine-x", `${((x + 0.5) * 100).toFixed(1)}%`);
        card.style.setProperty("--shine-y", `${((y + 0.5) * 100).toFixed(1)}%`);
      };
      const onLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
      return () => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      };
    });

    const magneticCleanups = Array.from(
      document.querySelectorAll<HTMLElement>(".start-button"),
    ).map((button) => {
      const onMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const bounds = button.getBoundingClientRect();
        const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        button.style.setProperty("--magnet-x", `${Math.max(-7, Math.min(7, x)).toFixed(1)}px`);
        button.style.setProperty("--magnet-y", `${Math.max(-5, Math.min(5, y)).toFixed(1)}px`);
      };
      const onLeave = () => {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      };
      button.addEventListener("pointermove", onMove);
      button.addEventListener("pointerleave", onLeave);
      return () => {
        button.removeEventListener("pointermove", onMove);
        button.removeEventListener("pointerleave", onLeave);
      };
    });

    return () => {
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scroll-progress");
      revealObserver.disconnect();
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      hero?.removeEventListener("pointermove", onHeroMove);
      hero?.removeEventListener("pointerleave", onHeroLeave);
      tiltCleanups.forEach((cleanup) => cleanup());
      magneticCleanups.forEach((cleanup) => cleanup());
    };
  }, []);
}
