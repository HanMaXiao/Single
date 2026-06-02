import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hyperspace 超空间科技",
  description: "AI 智能应用与前沿交互探索平台"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
