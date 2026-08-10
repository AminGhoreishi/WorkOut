import type { Metadata } from "next";
import HomeTemplate from "../../templates/HomeTemplate";
import { getHomeArticles, getHomePlans, getHomeStats } from "@/lib/homeData";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
  description:
    "استار فیت با مدیریت امیرحسین میرافتابی؛ ارائه دهنده آنلاین برنامه تمرینی، برنامه تخصصی فوتبالیستی، کالری شمار و محاسبات آنلاین تغذیه و بدنسازی.",
  authors: [{ name: "امیرحسین میرافتابی" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  keywords: [
    "استار فیت",
    "امیرحسین میرافتابی",
    "کالری شمار",
    "برنامه تمرینی",
    "برنامه فوتبالیستی",
    "بدنسازی",
    "تناسب اندام",
    "برنامه غذایی",
  ],
  openGraph: {
    title: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
    description:
      "ارائه دهنده برنامه‌های تمرینی تخصصی، برنامه فوتبالیستی، کالری شمار آنلاین و مشاوره بدنسازی با مدیریت امیرحسین میرافتابی.",
    siteName: "استار فیت",
    locale: "fa_IR",
    type: "website",
  },
};

export default async function Home() {
  await connection();
  const [articles, plans, stats] = await Promise.all([
    getHomeArticles(),
    getHomePlans(),
    getHomeStats(),
  ]);

  return <HomeTemplate articles={articles} stats={stats} plans={plans} />;
}
