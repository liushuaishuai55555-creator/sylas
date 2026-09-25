"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { sitePath } from "@/lib/site-path";

// Public profile references and avatar attribution are recorded in CREATOR_SOURCES.md.
const creators = [
  { name: "李子柒", avatar: "li", category: "田园生活", fans: "5,659", bio: "把四季烟火拍成诗。从一餐一饭到传统手艺，在田园日常里，呈现东方生活之美。" },
  { name: "无穷小亮的科普日常", avatar: "liang", category: "自然科普", fans: "2,463", bio: "从一株草到一只虫，用有趣又严谨的自然观察，解答那些让人忍不住好奇的小问题。" },
  { name: "刘畊宏", avatar: "liu", category: "运动健身", fans: "5,458", bio: "把运动的热情带进日常。用跟练直播与健身分享，陪屏幕前的人一起动起来。" },
  { name: "房琪kiki", avatar: "fang", category: "旅行人文", fans: "2,081", bio: "以山川为背景，用文字讲故事。走过远方，也记录旅途中打动人心的普通瞬间。" },
  { name: "张同学.", avatar: "zhang", category: "乡村生活", fans: "1,500", bio: "熟悉的东北乡村，利落的镜头节奏。把做饭、劳作和邻里日常，拍出生活自己的滋味。" },
  { name: "手工~耿", avatar: "geng", category: "创意手工", fans: "792", bio: "让天马行空的想法变成实物。用机械、手工和一点幽默，把意想不到做成看得见的惊喜。" },
];
const rows = [creators.slice(0, 3), creators.slice(3)];

export function CreatorWall() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => setPlaying(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (section.current) observer.observe(section.current);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync); };
  }, []);

  return <section id="stories" ref={section} className="creator-wall" aria-labelledby="stories-title" data-playing={playing && !paused}>
    <div className="creator-wall-heading">
      <p className="creator-wall-eyebrow"><i /> CREATOR VOICES</p>
      <h2 id="stories-title">每一种热爱，<br /><span>都有自己的舞台。</span></h2>
      <p className="creator-wall-intro">在抖音，让擅长的事，成为被看见的精彩。</p>
    </div>
    <div className="creator-wall-rows">
      {rows.map((row, rowIndex) => <div key={rowIndex} className="creator-wall-row" tabIndex={0} role="region" aria-label={`创作者第 ${rowIndex + 1} 排，聚焦或悬停暂停，可左右滑动`}>
        <div className="creator-wall-track">
          {[0, 1, 2, 3].map(copy => <div className="creator-wall-set" key={copy} aria-hidden={copy > 0 ? true : undefined}>
            {row.map(creator => <article className="creator-card" key={creator.name}>
              <div className="creator-card-head"><img src={sitePath(`/creators/${creator.avatar}.jpg`)} alt={`${creator.name}的头像`} width={56} height={56} loading="lazy" draggable={false} /><div><h3>{creator.name}</h3><span>{creator.category}博主</span></div><span className="creator-card-note" aria-hidden="true">♪</span></div>
              <p className="creator-card-bio">{creator.bio}</p>
              <div className="creator-card-foot"><span className="creator-card-fans"><small>约</small><strong>{creator.fans}</strong><span>万</span></span><span className="creator-card-label">抖音粉丝</span></div>
            </article>)}
          </div>)}
        </div>
      </div>)}
    </div>
    <div className="creator-wall-bottom"><span>不同的热爱，同样被看见。</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "继续滚动创作者卡片" : "暂停滚动创作者卡片"}>{paused ? <Play size={13} /> : <Pause size={13} />}<span>{paused ? "继续滚动" : "暂停滚动"}</span></button></div>
  </section>;
}
