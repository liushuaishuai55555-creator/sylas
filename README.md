# 抖音创作者宣传页 MVP

基于《抖音创作者宣传网站 PRD v1.0》实现的桌面优先宣传页。包含 Hero、AI Creation、Creator Tools、Recommendation、Creator Growth、Creator Stories、Final CTA 七个区块，以及注册 / 登录入口占位页。

## 本地运行

需要 Node.js 22.13+ 和 pnpm 11。

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开终端显示的本地地址。构建检查可运行 `pnpm build`。

## GitHub Pages

推送到 `main` 后，`.github/workflows/deploy-pages.yml` 会静态导出页面并部署到 GitHub Pages。发布地址：<https://liushuaishuai55555-creator.github.io/sylas/>。仓库的 Settings → Pages → Build and deployment 需选择 **GitHub Actions**。

## 说明

- 所有“开始创作”和“登录”入口通向 `/start` 占位页，未接入账号系统。
- 创作者卡片使用公开头像与粉丝约数，资料链接见 `CREATOR_SOURCES.md`；AI 辅助与内容触达图仅作概念展示。
- 页面浏览、区块曝光和 CTA 点击会写入浏览器的 `window.dataLayer`，方便以后连接分析平台。
- 中段已改为编辑式功能目录、滚动创作叙事、大幅内容影像、成长列表和创作者双排滚动卡片。六种功能支持手动切换，画面对比可拖动。演示未接入真实 AI 能力，声音轨道不播放音频。
- 桌面端首屏使用本地实拍视频。视频静音循环播放；鼠标移动时暂停，停止移动约 0.7 秒后继续播放。首屏没有播放控制按钮。其余动效包括滚动进度、区块入场和悬停反馈。
- 动效尊重系统的“减少动态效果”设置；按钮支持键盘焦点。现有窄屏布局保留，但本版重点检查桌面端。

## 首屏视频来源

视频素材：[Woman Taking Selfie Using a Cellphone](https://www.pexels.com/video/woman-taking-selfie-using-a-cellphone-6965036/)，作者 cottonbro studio。素材依照 [Pexels License](https://www.pexels.com/license/) 使用；项目内的视频截取并压缩为 10 秒、720p，原始素材未随项目提供。画面中人物仅为演示素材，不代表抖音官方代言或实际创作者案例。

## 2026-09-25 中段改版

参考 Awwwards 年度目录中的 Lusion v3、Don’t Board Me、Bruno Simon Portfolio，重新设计第 2–6 段。首屏、末屏及页脚结构、原全局 CSS、首屏视频逻辑保留。

- `components/creator-journey.tsx`：中段交互与内容。
- `app/journey.css`：所有新增样式限制在 `.journey` 范围。
- 原生滚动驱动的五阶段创作叙事；手机与减少动态效果设置改为手动章节切换。
- 创作者卡片分两排反向连续滚动，悬停、键盘聚焦或点击按钮可暂停；尊重系统的“减少动态效果”设置。
- 创作者头像与粉丝约数来源见 `CREATOR_SOURCES.md`。
- 无新增依赖。使用原项目 `pnpm dev` / `pnpm build` 流程；GitHub 仓库保存源码，不等同于网站上线。
