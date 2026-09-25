"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatorWall } from "@/components/creator-wall";
import { FeatureDemo } from "@/components/feature-showcase";
import { sitePath } from "@/lib/site-path";

const assists = [
  { id: "idea", title: "灵感", en: "IDEATE", text: "一个念头，也有很多种拍法。", detail: "从一个生活片段出发，找到属于你的表达角度。" },
  { id: "script", title: "文案", en: "WRITE", text: "让想说的话，慢慢有了形状。", detail: "把零散的想法整理成开场、重点与结尾。" },
  { id: "edit", title: "剪辑", en: "EDIT", text: "把片段，剪成你的故事。", detail: "梳理镜头与节奏，把时间留给真正想讲的内容。" },
  { id: "captions", title: "字幕", en: "CAPTION", text: "每一句表达，都值得被看清。", detail: "让文字跟上画面，静音时也不错过小细节。" },
  { id: "audio", title: "声音", en: "SOUND", text: "让情绪，有自己的节奏。", detail: "找到合适的音乐，听见生活的另一面。" },
  { id: "visual", title: "画面", en: "REFINE", text: "把眼前的日常，调成喜欢的模样。", detail: "拖动画面分界线，看看色彩带来的不同感觉。" },
] as const;
const steps = [
  { title: "先有一个想法。", tag: "策划 / FIND YOUR IDEA", copy: "今天的晚餐、熟悉的街角，或是刚学会的一件小事。值得分享的故事，常常就在身边。", caption: "今天，想记录什么？" },
  { title: "然后，按下记录。", tag: "拍摄 / CAPTURE A MOMENT", copy: "不用等到一切准备完美。打开镜头，让真实发生的这一刻，成为第一个画面。", caption: "REC · 留住这一刻" },
  { title: "剪出你的节奏。", tag: "编辑 / MAKE IT YOURS", copy: "留下喜欢的片段，配上一句文字、一段音乐。平凡的素材，也可以有自己的表达。", caption: "片段 01 —— 02 —— 03" },
  { title: "让故事，与人相遇。", tag: "发布 / SHARE YOUR STORY", copy: "选一张封面，写下想说的话。让这份小小的创作，走出你的相册。", caption: "准备好，就分享吧。" },
  { title: "再向前，一小步。", tag: "复盘 / KEEP EXPLORING", copy: "看看人们在哪一刻停留，听听评论里的声音。下一条内容，从新的发现开始。", caption: "下一条，继续热爱。" },
];

function JourneyFilm({ paused, className = "" }: { paused: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !paused && !document.hidden && !preference.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync); video.pause(); };
  }, [paused]);
  return <video ref={ref} className={className} src={sitePath("/rosie/journey-film.mp4")} poster={sitePath("/rosie/portrait-studio.jpg")} muted loop playsInline preload="metadata" aria-label="创作者记录生活的影像" />;
}

export function CreatorJourney() {
  const [assist, setAssist] = useState<string>("idea");
  const [activeStep, setActiveStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const process = useRef<HTMLElement>(null);
  const featureArea = useRef<HTMLElement>(null);
  const [demoPlaying, setDemoPlaying] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const sync = () => setDemoPlaying(inView && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); });
    if (featureArea.current) observer.observe(featureArea.current);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!process.current || !matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)").matches) return;
      const rect = process.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - innerHeight)));
      process.current.style.setProperty("--journey-progress", String(progress));
      setActiveStep(Math.min(4, Math.floor(progress * 5)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    update();
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, []);

  const goToStep = (index: number) => {
    const node = process.current;
    if (!node) return;
    if (matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)").matches) {
      window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top + (node.offsetHeight - innerHeight) * ((index + .35) / 5), behavior: "smooth" });
    } else setActiveStep(index);
  };


  return <div className="journey">
    <section id="ai-creation" ref={featureArea} className="j-assist" aria-labelledby="ai-title" data-view-event="ai_creation_view">
      <div className="j-container">
        <div className="j-section-meta"><span>01 — 从灵感开始</span><span>IDEAS INTO STORIES <ArrowDown size={14} /></span></div>
        <div className="j-assist-heading"><h2 id="ai-title">你的灵感。<br /><span>现在，成真。</span></h2><p>把繁琐留给工具，<br />把表达留给自己。<br /><small>六种辅助，让创作顺手一点。</small></p></div>
        <Tabs value={assist} onValueChange={setAssist} className="j-assist-workspace">
          <TabsList className="j-assist-tabs" aria-label="探索六种创作辅助">
            {assists.map((item, index) => <TabsTrigger key={item.id} value={item.id} className="j-assist-tab"><span className="j-tab-no">0{index + 1}</span><strong>{item.title}</strong><span className="j-tab-en">{item.en}</span><ArrowUpRight size={23} /></TabsTrigger>)}
          </TabsList>
          <div className="j-demo-wrap">
            {assists.map(item => <TabsContent key={item.id} value={item.id} className="j-demo-panel"><div className="j-demo-title"><h3>{item.text}</h3><span>AI ASSIST / {item.en}</span></div><div className="j-demo-surface" data-playing={demoPlaying}><FeatureDemo id={item.id} playing={demoPlaying} /></div><div className="j-demo-caption"><p>{item.detail}</p><span>功能概念演示</span></div></TabsContent>)}
          </div>
        </Tabs>
        <div className="j-assist-end"><span>不必等到准备好。</span><span>从一个念头，就可以出发。 ↘</span></div>
      </div>
    </section>

    <section id="creator-tools" ref={process} className="j-process" aria-labelledby="tools-title" data-view-event="creator_tools_view">
      <div className="j-process-pin">
        <div className="j-process-image"><JourneyFilm paused={paused} /><div className="j-process-shade" /><span className="j-film-caption" aria-live="polite">{steps[activeStep].caption}</span><button className="j-film-control" onClick={() => setPaused(!paused)} aria-label={paused ? "播放创作影像" : "暂停创作影像"}>{paused ? <Play size={16} /> : <Pause size={16} />}</button></div>
        <div className="j-process-content j-container"><div className="j-section-meta"><span>02 — 一条作品的诞生</span><span>MAKE SOMETHING YOURS</span></div><div className="j-process-copy"><div className="j-process-count" aria-hidden="true">0{activeStep + 1}<span>/ 05</span></div><div key={activeStep} className="j-process-text"><p className="j-overline">{steps[activeStep].tag}</p><h2 id="tools-title">{steps[activeStep].title}</h2><p>{steps[activeStep].copy}</p></div></div><nav className="j-process-nav" aria-label="创作过程"><span>从第一条，到下一条</span>{["策划", "拍摄", "编辑", "发布", "复盘"].map((title, index) => <button key={title} onClick={() => goToStep(index)} aria-current={index === activeStep ? "step" : undefined}><small>0{index + 1}</small>{title}</button>)}</nav></div>
        <div className="j-process-progress" aria-hidden="true"><i /></div>
      </div>
    </section>

    <section id="recommendation" className="j-reach" aria-labelledby="recommendation-title" data-view-event="recommendation_view">
      <div className="j-container"><div className="j-section-meta"><span>03 — 表达，自有共鸣</span><span>MADE TO CONNECT</span></div><div className="j-reach-intro"><h2 id="recommendation-title">你眼里的风格，<br />是别人想看的<span>世界。</span></h2><p>一个眼神，一束光，一段自由的表达。<br />让好内容，有机会遇见懂它的人。</p></div></div>
      <figure className="j-reach-image"><img src={sitePath("/rosie/portrait-studio.jpg")} alt="短视频中的蓝衣创作者与街头伙伴" loading="lazy" /><figcaption><span>YOUR OWN EXPRESSION.</span><strong>“风格，没有标准答案。”</strong><span>风格影像 / 自由表达</span></figcaption><div className="j-reach-stamp">与你<br />同频。</div></figure>
      <div className="j-container j-reach-bottom"><span>一条内容，<br />不止一种共鸣。</span><div><p>被一个镜头吸引的人。<br />正在寻找风格灵感的人。<br /><em>和你一样，喜欢自由表达的人。</em></p><small>内容有机会通过推荐连接相关兴趣用户。以上为概念表达，不代表分发效果承诺。</small></div></div>
    </section>

    <section id="growth" className="j-growth" aria-labelledby="growth-title"><div className="j-container"><div className="j-section-meta"><span>04 — 慢慢，成为创作者</span><span>GROW AT YOUR OWN PACE</span></div><div className="j-growth-layout"><div className="j-growth-heading"><span className="j-growth-orbit" aria-hidden="true">↗</span><h2 id="growth-title">不必一开始，<br />就很<span>了不起。</span></h2><p>影响力不是一个起点。<br />它藏在每一次真实的表达里。</p><a href={sitePath("/start/")}>让第一条内容发生 <ArrowUpRight size={18} /></a></div><ol className="j-growth-list">{[
      ["01", "先发布，再慢慢找到自己。", "把想法变成第一条作品。真实的表达，比一开始就完美更重要。", "START SOMEWHERE"],
      ["02", "一句回应，就有新的动力。", "从第一次点赞、第一条评论开始，感受屏幕另一端的共鸣。", "FIND A CONNECTION"],
      ["03", "每一次尝试，都更像你。", "试试不同的主题与节奏。在持续创作中，找到自己的表达风格。", "MAKE IT PERSONAL"],
      ["04", "让热爱，慢慢聚在一起。", "分享你在意的事，让喜欢同样事物的人，有机会在这里相遇。", "GROW TOGETHER"],
    ].map(([number, title, text, en]) => <li key={number}><span>{number}</span><div><small>{en}</small><h3>{title}</h3><p>{text}</p></div><ArrowUpRight size={24} aria-hidden="true" /></li>)}</ol></div></div></section>

    <CreatorWall />
  </div>;
}
