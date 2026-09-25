import type { Metadata } from "next";
import "./globals.css";
import "./journey.css";
import { sitePath } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "抖音创作者 | 让灵感被看见",
  description: "从第一条短视频到持续创作，探索灵感辅助、创作工具和内容连接的可能。",
  icons: {
    icon: sitePath("/favicon.svg"),
    shortcut: sitePath("/favicon.svg"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
