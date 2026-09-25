"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Camera, ChefHat, Dumbbell, Gamepad2, Leaf, Music2, Palette, PawPrint, Plane, Pause, Play } from "lucide-react";

const rows = [
  [
    { category: "美食", icon: ChefHat, color: "orange", title: "一餐一饭，都有生活的滋味。", description: "家常菜的做法、街头小店的烟火气，还有让人想家的那一口。", tags: "家常料理 / 探店 / 地方风味" },
    { category: "旅行", icon: Plane, color: "cyan", title: "跟着镜头，去看更大的世界。", description: "从周末的山野，到远方的城市，把沿途的风景和故事分享出来。", tags: "旅行攻略 / 城市漫游 / 户外风景" },
    { category: "音乐", icon: Music2, color: "pink", title: "总有一段旋律，刚好打动你。", description: "卧室里的原创、街头的弹唱、一次随性的合奏，让热爱被听见。", tags: "原创音乐 / 乐器演奏 / 翻唱" },
    { category: "知识", icon: BookOpen, color: "purple", title: "换个角度，世界又懂了一点。", description: "讲清一个科学问题，拆解一个生活常识，也分享一次新的发现。", tags: "科普 / 历史文化 / 实用技能" },
    { category: "运动", icon: Dumbbell, color: "green", title: "每一次出发，都在靠近更好的自己。", description: "跑过清晨的街道，练好一个动作，记录每一份坚持与突破。", tags: "健身日常 / 跑步 / 球类运动" },
  ],
  [
    { category: "萌宠", icon: PawPrint, color: "pink", title: "平凡的一天，被小可爱治愈。", description: "猫咪的奇怪睡姿、小狗的热情迎接，让生活多一点柔软和快乐。", tags: "猫狗日常 / 养宠分享 / 治愈瞬间" },
    { category: "影像", icon: Camera, color: "purple", title: "把路过的日常，拍成值得珍藏的画面。", description: "一束光、一条街、一个转身，用自己的视角发现身边的美。", tags: "摄影 / 短片创作 / 镜头语言" },
    { category: "创意", icon: Palette, color: "orange", title: "脑海里的奇思妙想，都能变成作品。", description: "从一笔涂鸦到一件手作，看灵感如何一点点成为现实。", tags: "绘画 / 手工 / 创意设计" },
    { category: "游戏", icon: Gamepad2, color: "cyan", title: "精彩不止通关，还有一起玩的快乐。", description: "分享高光时刻、攻略心得，也记录和朋友并肩作战的默契。", tags: "游戏攻略 / 精彩操作 / 趣味解说" },
    { category: "生活", icon: Leaf, color: "green", title: "认真过的每一天，都值得被看见。", description: "整理房间、照料绿植、尝试新的爱好，在细碎日常里找到热爱。", tags: "生活记录 / 家居 / 兴趣日常" },
  ],
];

export function ContentMarquee() {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; sync(); }, { threshold: .05 });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div className="content-marquee" ref={root} data-paused={paused || !visible}>
    <div className="content-marquee-controls page-container"><span>不同的兴趣，在这里相遇</span><button aria-label={paused ? "继续滚动内容卡片" : "暂停滚动内容卡片"} onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} /> : <Pause size={14} />}{paused ? "继续滚动" : "暂停滚动"}</button></div>
    <div className="content-marquee-viewport">{rows.map((row, rowIndex) => <div className={`content-marquee-row row-${rowIndex}`} key={rowIndex}><div className="content-marquee-track">{[0, 1, 2].map(copy => <div className="content-marquee-set" key={copy} aria-hidden={copy > 0 ? true : undefined}>{row.map(({ category, icon: Icon, color, title, description, tags }) => <article className={`content-topic topic-${color}`} key={category}><div className="content-topic-icon"><Icon size={28} strokeWidth={1.6} /></div><div className="content-topic-copy"><span className="content-topic-category">{category}</span><h3>{title}</h3><p>{description}</p><span className="content-topic-tags">{tags}</span></div></article>)}</div>)}</div></div>)}</div>
  </div>;
}
