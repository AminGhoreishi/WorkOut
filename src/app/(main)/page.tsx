import type { Metadata } from "next";
import HomeTemplate from "../../templates/HomeTemplate";

export const metadata: Metadata = {
  title: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
  description:
    "استار فیت با مدیریت امیرحسین میرآفتابی؛ ارائه دهنده آنلاین برنامه تمرینی، بدنسازی تخصصی فوتبال، کالری شمار و محاسبات آنلاین تغذیه و بدنسازی.",
  authors: [{ name: "امیرحسین میرآفتابی" }],
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
    "امیرحسین میرآفتابی",
    "کالری شمار",
    "برنامه تمرینی",
    "بدنسازی تخصصی فوتبال",
    "بدنسازی",
    "تناسب اندام",
    "برنامه غذایی",
  ],
  openGraph: {
    title: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
    description:
      "ارائه دهنده برنامه‌های تمرینی تخصصی، بدنسازی تخصصی فوتبال، کالری شمار آنلاین و مشاوره بدنسازی با مدیریت امیرحسین میرآفتابی.",
    siteName: "استار فیت",
    locale: "fa_IR",
    type: "website",
  },
};

export default function Home() {
  return <HomeTemplate />;
}
