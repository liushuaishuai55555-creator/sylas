import type { Metadata } from "next";
import "./globals.css";
import "./journey.css";

export const metadata: Metadata = {
  title: "抖音创作者 | 让灵感被看见",
  description: "从第一条短视频到持续创作，探索灵感辅助、创作工具和内容连接的可能。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
