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
- 桌面端首屏使用本地视频。视频静音循环播放；鼠标移动时暂停，停止移动约 0.7 秒后继续播放。首屏没有播放控制按钮。其余动效包括滚动进度、区块入场和悬停反馈。
- 动效尊重系统的“减少动态效果”设置；按钮支持键盘焦点。桌面与手机宽度均已检查。

## 当前人物影像来源

首屏、创作过程、功能预览和推荐区的人物影像取自用户提供的 [roses_are_rosie 抖音主页](https://www.douyin.com/user/MS4wLjABAAAAl0JxrsV3em6sGmzyUV-99m6v99SNSPQ4iHFTOeMYKe3NBbFWv-S74UoipfvmJMti?from_tab_name=main)录屏。已截取两段无声视频与四张静帧，移除录屏中的手机状态栏和播放控件；原始录屏未入库。创作者卡片头像继续对应各自姓名，避免人物与资料错配。

## 2026-09-25 中段改版

参考 Awwwards 年度目录中的 Lusion v3、Don’t Board Me、Bruno Simon Portfolio，重新设计第 2–6 段。首屏、末屏及页脚结构、原全局 CSS、首屏视频逻辑保留。

- `components/creator-journey.tsx`：中段交互与内容。
- `app/journey.css`：所有新增样式限制在 `.journey` 范围。
- 原生滚动驱动的五阶段创作叙事；手机与减少动态效果设置改为手动章节切换。
- 创作者卡片分两排反向连续滚动，悬停、键盘聚焦或点击按钮可暂停；尊重系统的“减少动态效果”设置。
- 创作者头像与粉丝约数来源见 `CREATOR_SOURCES.md`。
- 无新增依赖。使用原项目 `pnpm dev` / `pnpm build` 流程；GitHub 仓库保存源码，不等同于网站上线。
