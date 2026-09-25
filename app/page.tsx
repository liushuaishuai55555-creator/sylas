"use client";

import { useEffect } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroFilm } from "@/components/hero-film";
import { CreatorJourney } from "@/components/creator-journey";
import { useDesktopMotion } from "@/hooks/use-desktop-motion";

const navigation = [
  { label: "创作工具", href: "#creator-tools" },
  { label: "创作者成长", href: "#growth" },
  { label: "发现精彩", href: "#stories" },
];

type EventName =
  | "page_view"
  | "hero_cta_click"
  | "ai_creation_view"
  | "creator_tools_view"
  | "recommendation_view"
  | "creator_story_click"
  | "final_cta_view"
  | "final_cta_click";

function trackEvent(event: EventName, properties: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const pageWindow = window as Window & { dataLayer?: Array<Record<string, string>> };
  pageWindow.dataLayer = pageWindow.dataLayer || [];
  pageWindow.dataLayer.push({ event, ...properties });
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="抖音创作者，返回页面顶部">
      <span className="brand-mark" aria-hidden="true">♪</span>
      <span>抖音<span className="brand-light">创作者</span></span>
    </a>
  );
}

function StartLink({
  source,
  className = "",
  children = "开始创作",
}: {
  source: "hero" | "header" | "final";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button asChild className={`start-button ${className}`}>
      <a
        href="/start"
        onClick={() => trackEvent(source === "final" ? "final_cta_click" : "hero_cta_click", { source })}
      >
        {children}
        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
      </a>
    </Button>
  );
}

export default function Home() {
  useDesktopMotion();

  useEffect(() => {
    trackEvent("page_view", { page: "creator_landing" });
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const event = entry.target.getAttribute("data-view-event") as EventName | null;
          if (event && !seen.has(event)) {
            seen.add(event);
            trackEvent(event);
          }
        }
      },
      { threshold: 0.25 },
    );
    document.querySelectorAll("[data-view-event]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="top" className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <a className="skip-link" href="#main">跳转到主要内容</a>
      <header className="site-header">
        <div className="header-inner page-container">
          <Brand />
          <nav className="desktop-nav" aria-label="主导航">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="header-actions">
            <a className="login-link" href="/start?mode=login">登录</a>
            <StartLink source="header" className="header-start" />
            <details className="mobile-menu">
              <summary aria-label="导航菜单"><Menu size={23} aria-hidden="true" /></summary>
              <nav aria-label="移动端导航">
                {navigation.map((item) => <a key={item.href} href={item.href} aria-label={item.label}>{item.label}</a>)}
                <a href="/start?mode=login" aria-label="登录">登录</a>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero-section" aria-labelledby="hero-title">
          <HeroFilm />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-cursor-light" aria-hidden="true" />
          <div className="hero-content page-container">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-line" />给每一个想表达的人</p>
            <h1 id="hero-title"><span className="hero-title-line"><span>让每一个灵感，</span></span><span className="hero-title-line"><span>都有被看见的机会。</span></span></h1>
            <p className="hero-description">从第一条短视频到持续创作，用更轻松的方式表达自己，让内容有机会遇见感兴趣的人。</p>
            <div className="hero-actions">
              <StartLink source="hero" />
              <a className="text-link" href="#ai-creation">了解创作工具 <ArrowDown size={17} aria-hidden="true" /></a>
            </div>
            <div className="hero-bottom-note"><span className="note-line" />灵感、创作、连接，从这里开始</div>
          </div>
        </section>

        <CreatorJourney />

        <section id="final" className="final-section" aria-labelledby="final-title" data-view-event="final_cta_view">
          <div className="page-container final-content motion-reveal">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-line" />YOUR STORY STARTS HERE</p>
            <h2 id="final-title">现在，开始你的<br /><span>第一条创作。</span></h2>
            <p>从一个想法、一段日常、一次想分享的瞬间开始。</p>
            <div className="final-actions"><StartLink source="final" /><a href="/start?mode=login">已有账号？登录 <ArrowRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-inner"><Brand /><p>概念展示页。具体功能与服务以抖音官方实际信息为准。</p><a href="#top">返回顶部 ↑</a></div>
      </footer>
    </div>
  );
}
