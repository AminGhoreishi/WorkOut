import type { Metadata } from "next";
import HomeTemplate from "../../templates/HomeTemplate";

export const metadata: Metadata = {
  title: {
    absolute: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
  },
  description:
    "استار فیت با مدیریت امیرحسین میرآفتابی؛ ارائه دهنده آنلاین برنامه تمرینی، بدنسازی تخصصی فوتبال، کالری شمار و محاسبات آنلاین تغذیه و بدنسازی.",
  authors: [{ name: "امیرحسین میرآفتابی" }],
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
    title: {
    absolute: "استار فیت | سامانه تخصصی تناسب اندام و بدنسازی",
  },
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
