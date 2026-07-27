import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/model/Blog";
import UserModel from "@/model/User";
import HomeTemplate from "../../templates/HomeTemplate";

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
  await dbConnect();

  const latestBlogs = await BlogModel.find({ status: "published" })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("authorId")
    .lean();

  const articles = latestBlogs.map((blog: any) => {
    const authorName =
      blog.authorId?.fullName || blog.authorId?.username || "نویسنده مهمان";
    const authorInitial = authorName.substring(0, 1);
    const publishDateString = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      day: "numeric",
    }).format(new Date(blog.createdAt));

    const wordCount = blog.content ? blog.content.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return {
      id: blog._id.toString(),
      title: blog.title,
      slug: blog.slug,
      excerpt:
        blog.excerpt ||
        (blog.content ? blog.content.substring(0, 100) + "..." : ""),
      image: blog.image || "",
      category: blog.category,
      readingTime: `${readingTime} دقیقه مطالعه`,
      authorName,
      authorInitial,
      publishDate: publishDateString,
    };
  });

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const [todayCount, yesterdayCount] = await Promise.all([
    UserModel.countDocuments({ createdAt: { $gte: startOfToday } }),
    UserModel.countDocuments({
      createdAt: { $gte: startOfYesterday, $lt: startOfToday },
    }),
  ]);

  const formatPersianNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(num);
  };

  let trendText = "";
  if (yesterdayCount === 0) {
    if (todayCount > 0) {
      trendText = `+${formatPersianNumber(100)}% نسبت به دیروز`;
    } else {
      trendText = `${formatPersianNumber(0)}% نسبت به دیروز`;
    }
  } else {
    const percentage = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    const formattedPercent = new Intl.NumberFormat("fa-IR", {
      signDisplay: "exceptZero",
    }).format(Math.round(percentage));
    trendText = `${formattedPercent}% نسبت به دیروز`;
  }

  const stats = {
    todayUsersCount: formatPersianNumber(todayCount),
    trendText,
  };

  return <HomeTemplate articles={articles} stats={stats} />;
}
