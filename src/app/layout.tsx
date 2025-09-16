import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "导师选择分析平台",
  description: "为大学生提供最专业的导师选择建议，基于数据分析和智能匹配，让学术之路更加清晰明确。",
  keywords: ["导师选择", "数据分析", "智能匹配", "学术指导", "大学导师"],
  authors: [{ name: "导师选择分析平台团队" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
