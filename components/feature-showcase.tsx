"use client";

import { useEffect, useRef, useState } from "react";
import {
  AudioLines,
  Captions,
  Clapperboard,
  FileText,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const features = [
  {
    id: "idea",
    icon: Lightbulb,
    title: "灵感辅助",
    summary: "把模糊的想法，变成可以开拍的主题。",
    heading: "一个念头，也有很多种拍法。",
    detail: "输入想表达的内容，看看它可以从哪些角度讲起。",
  },
  {
    id: "script",
    icon: FileText,
    title: "文案辅助",
    summary: "从开场白到提纲，让表达更有方向。",
    heading: "想说的话，先理成清楚的脉络。",
    detail: "围绕主题梳理开场、重点和结尾，录制时更从容。",
  },
  {
    id: "edit",
    icon: Clapperboard,
    title: "智能剪辑",
    summary: "整理片段与节奏，少做重复操作。",
    heading: "把片段排好，让故事更流畅。",
    detail: "梳理镜头顺序与关键时刻，把时间留给真正想讲的内容。",
  },
  {
    id: "captions",
    icon: Captions,
    title: "字幕呈现",
    summary: "重点说得更清楚，静音也能看懂。",
    heading: "每一句表达，都值得被看清。",
    detail: "为画面配上易读的文字，重要信息自然不会错过。",
  },
  {
    id: "audio",
    icon: AudioLines,
    title: "声音搭配",
    summary: "用合适的声音，带出内容的情绪。",
    heading: "让声音，跟画面一起讲故事。",
    detail: "寻找适合的音乐与节奏，让情绪和叙事更贴合。",
  },
  {
    id: "visual",
    icon: Sparkles,
    title: "画面优化",
    summary: "调整色彩与质感，呈现想要的氛围。",
    heading: "让想呈现的感觉，更接近眼前。",
    detail: "微调亮度、色彩与画面氛围，保留自己的表达风格。",
  },
] as const;

type FeatureId = (typeof features)[number]["id"];
const SHOWCASE_DURATION_MS = 8000;

function ShowcaseFilm({ playing }: { playing: boolean }) {
  return <img className="showcase-photo fashion-film" src="/fashion-editorial.png" alt="青红轮廓光下的时尚人像创作" data-playing={playing} />;
}

function Waveform({ tone = "" }: { tone?: string }) {
  return <div className={`demo-wave ${tone}`} aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ height: `${18 + (i * 29 % 61)}%`, animationDelay: `${i * -0.09}s` }} />)}</div>;
}

export function FeatureDemo({ id, playing }: { id: FeatureId; playing: boolean }) {
  const [comparison, setComparison] = useState(50);
  const [cue, setCue] = useState(1);
  useEffect(() => {
    if (!playing || id !== "captions") return;
    const timer = window.setInterval(() => setCue(value => (value + 1) % 4), 2500);
    return () => window.clearInterval(timer);
  }, [playing, id]);
  const captions = ["让镜头，跟着感觉走", "把此刻的态度", "留在光影之间", "风格，由你定义"];
  const cueTimes = [0, 3, 5, 8];
  if (id === "idea") return <div className="demo-stage demo-ideas">
    <div className="demo-kicker"><Lightbulb size={18} /> 从一个想法开始</div>
    <div className="idea-input"><span>我想拍…</span><strong>拍一支有自己风格的短片</strong><span className="demo-spark"><Sparkles size={20} /></span></div>
    <div className="idea-connector" />
    <div className="idea-results">{[
      ["01", "风格记录", "用光影，写下今天的情绪", "轮廓开场 → 细节特写 → 回眸定格"],
      ["02", "镜头实验", "一个转身，也能成为主角", "近景 → 中景 → 节奏切换"],
      ["03", "情绪共鸣", "不必定义，表达就好", "一束光 → 一个眼神 → 一种态度"],
    ].map(([n, tag, title, detail]) => <div className="idea-result" key={n}><div><span>{tag}</span><small>{n}</small></div><h4>{title}</h4><p>{detail}</p></div>)}</div>
    <div className="demo-footnote">一个主题，展开三种创作方向</div>
  </div>;
  if (id === "script") return <div className="demo-stage demo-writing">
    <div className="script-brief"><FileText size={22} /><span>创作主题</span><strong>我的风格影像</strong><div><span>自然口语</span><span>15 秒短片</span></div><p>从真实体验出发，<br />让分享更像一次聊天。</p></div>
    <div className="script-paper"><div className="paper-title">口播文案 <span>草稿示例</span></div><h4>不必急着定义，<br />让镜头跟着感觉走。</h4><div className="script-paragraph"><span>01 / 开场</span><p>从一束光开始，让轮廓慢慢走进画面。</p></div><div className="script-paragraph"><span>02 / 展开</span><p>转身、停顿、看向镜头，用三个片段找到自己的节奏。</p></div><div className="script-paragraph"><span>03 / 结尾</span><p>风格没有标准答案，表达就是你的签名。<i className="writing-caret" /></p></div></div>
  </div>;
  if (id === "edit") return <div className="demo-stage demo-editor">
    <div className="editor-top"><div className="media-bin"><span>素材 · 03</span>{["轮廓光影", "人物特写", "回眸定格"].map((t, i) => <div key={t} className={`media-thumb crop-${i}`}><img src="/fashion-editorial.png" alt="" /><span>{t}</span></div>)}</div><div className="editor-monitor"><img src="/fashion-editorial.png" alt="时尚短片剪辑概念预览" /><span>让风格，自由发生</span><small>预览 / 00:08</small></div></div>
    <div className="editor-timeline"><div className="timeline-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div><div className="timeline-clips">{["光影", "特写", "定格"].map((t,i) => <div key={t}><img src="/fashion-editorial.png" alt="" style={{objectPosition: `${i*45}% center`}} /><span>{t}</span></div>)}</div><div className="timeline-audio"><Waveform /><span>背景音乐</span></div><i className="timeline-cursor" /></div>
  </div>;
  if (id === "captions") return <div className="demo-stage demo-subtitles"><div className="subtitle-monitor"><ShowcaseFilm playing={playing} /><span className="subtitle-tag">字幕效果预览</span><div className="subtitle-overlay">{cue === 1 ? <>把此刻的<mark>态度</mark></> : captions[cue]}</div></div><div className="subtitle-transcript"><div className="demo-kicker"><Captions size={18} /> 字幕与画面同步</div>{captions.map((line, index) => <p key={line} className={cue === index ? "current" : ""}><time>00:0{cueTimes[index]}</time>{line}</p>)}<div className="subtitle-style"><span>重点高亮</span><b>态度</b></div></div></div>;
  if (id === "audio") return <div className="demo-stage demo-sound"><div className="sound-cover"><img src="/fashion-editorial.png" alt="晚餐风格记录" /><div><span>风格记录 / 声音搭配</span><h4>听见画面的节奏。</h4></div></div><div className="sound-mixer"><div className="sound-track"><span><AudioLines size={18} /> 人声 <small>清晰讲述</small></span><Waveform tone="voice" /></div><div className="sound-track"><span>♫ 背景音乐 <small>简洁 · 律动</small></span><Waveform /></div><div className="sound-levels"><span>人声优先</span><span>音乐轻轻衬托</span></div></div></div>;
  return <div className="demo-stage demo-color"><div className="color-comparison"><img src="/fashion-editorial.png" alt="优化后的创作画面" /><img className="color-before" src="/fashion-editorial.png" alt="" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }} /><span className="color-label before">柔和色调</span><span className="color-label after">冷调光影</span><div className="color-divider" style={{left: `${comparison}%`}}><span>↔</span></div><input type="range" min="5" max="95" value={comparison} onChange={event => setComparison(Number(event.target.value))} aria-label="拖动画面对比" aria-valuetext={`柔和色调占 ${comparison}%`} /></div><div className="color-presets"><span>拖动对比画面</span><strong>冷调时尚</strong><span>轮廓光</span><span>青红色调</span></div></div>;
}

export function FeatureShowcase() {
  const [active, setActive] = useState<FeatureId>("idea");
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const playing = inView && pageVisible && !reducedMotion;
  const cycling = playing && !focused;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);
    updatePreference();
    updateVisibility();
    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!cycling) return;
    const timer = window.setTimeout(() => {
      setActive((current) => {
        const index = features.findIndex((feature) => feature.id === current);
        return features[(index + 1) % features.length].id;
      });
    }, SHOWCASE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [active, cycling]);

  return <Tabs
    ref={rootRef}
    value={active}
    onValueChange={(value) => setActive(value as FeatureId)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false);
    }}
    data-cycling={cycling}
    className="feature-showcase motion-reveal"
    data-playing={playing}
  >
    <div className="showcase-window">
      <div className="showcase-window-bar" aria-hidden="true">
        <span className="showcase-window-dots"><i /><i /><i /></span>
        <span>创作灵感空间</span>
        <span className="showcase-live"><i />动态概念演示</span>
      </div>
      {features.map((feature, index) => <TabsContent value={feature.id} key={feature.id} className="showcase-content">
        <FeatureDemo id={feature.id} playing={playing} />
        <div className="showcase-detail">
          <p className="showcase-count">CREATION ASSIST / 0{index + 1}</p>
          <div className="showcase-detail-copy">
            <span className="showcase-detail-label">{feature.title}</span>
            <h3>{feature.heading}</h3>
            <p>{feature.detail}</p>
          </div>
          <div className="showcase-result"><feature.icon size={24} /><span>{feature.summary}</span></div>
        </div>
        <div className="showcase-playback" aria-hidden="true"><span /></div>
      </TabsContent>)}
    </div>
    <TabsList className="feature-selector" aria-label="查看创作辅助功能">
      {features.map(({ id, icon: Icon, title, summary }, index) => <TabsTrigger className="feature-selector-card" key={id} value={id} aria-label={`${title}：${summary}`}>
        <span className="feature-selector-top"><Icon size={25} strokeWidth={1.8} aria-hidden="true" /><span>0{index + 1}</span></span>
        <strong>{title}</strong>
        <small>{summary}</small>
      </TabsTrigger>)}
    </TabsList>
  </Tabs>;
}
