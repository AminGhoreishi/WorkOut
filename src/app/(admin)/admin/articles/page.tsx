import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import registerModels from "@/lib/registerModels";
import Blog from "@/models/Blog";
import AdminArticles from "@/features/admin/dashboard/articles/AdminArticles";
import type { AdminBlogStats } from "@/types/blog";
import { connection } from "next/server";

export const metadata: Metadata = {
  title: "مدیریت مقالات | استار فیت",
  description: "مشاهده، افزودن، ویرایش و مدیریت تمامی مقالات سامانه استارفیت",
};

export default async function AdminArticlesPage() {
  await connection();
  registerModels();
  await dbConnect();

  const [totalCount, publishedCount, draftCount, totalViewsResult] =
    await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      Blog.aggregate([
        { $group: { _id: null, total: { $sum: "$views" } } },
      ]),
    ]);

  const stats: AdminBlogStats = {
    totalViews: totalViewsResult[0]?.total || 0,
    publishedCount,
    draftCount,
  };

  return <AdminArticles stats={stats} totalCount={totalCount} />;
}
