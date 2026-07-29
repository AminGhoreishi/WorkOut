import Articles from "@/modules/articles/Articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات تخصصی ورزشی و تغذیه | استارفیت",
  description:
    "جدیدترین مقالات آموزشی بدنسازی، برنامه غذایی، مکمل‌ها و برنامه‌های تمرینی تحت نظر امیرحسین میرافتابی در سامانه استارفیت",
  openGraph: {
    title: "مقالات تخصصی ورزشی و تغذیه | استارفیت",
    description: "جدیدترین مقالات آموزشی بدنسازی، تغذیه و سلامت استارفیت",
  },
};

export default function ArticlesPage() {
  return <Articles />;
}
