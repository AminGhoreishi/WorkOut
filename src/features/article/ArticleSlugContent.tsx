import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Wish from "@/models/Wish";
import ArticleDetail from "@/features/article/ArticleDetail";
import type { ArticlePageProps } from "@/types/blog";
import Comment from "@/models/Comment";

export default async function ArticlePageContent({ params }: ArticlePageProps) {
  await connection();
  const { slug } = await params;

  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    notFound();
  }

  await dbConnect();

  const [session, blog] = await Promise.all([
    getServerSession(authOptions),
    Blog.findOne({ slug: decodedSlug, status: "published" })
      .populate("authorId", "username fullName role")
      .lean(),
  ]);

  if (!blog) {
    notFound();
  }

  const userId = session?.user?.id || null;

  const [relatedBlogs, existingWish, totalComments] = await Promise.all([
    Blog.find({
      category: blog.category,
      status: "published",
      _id: { $ne: blog._id },
    })
      .select("title slug image category content createdAt")
      .sort({ createdAt: -1 })
      .limit(3)
      .lean(),
    userId ? Wish.findOne({ userId, blogId: blog._id }).lean() : null,
    Comment.countDocuments({ blogId: blog._id, isApproved: true }),
  ]);

  const isWished = Boolean(existingWish);
  const isLiked =
    Boolean(userId) &&
    Array.isArray(blog.likedUsers) &&
    blog.likedUsers.some((id: unknown) => String(id) === String(userId));

  const serializedArticle = JSON.parse(JSON.stringify(blog));
  const serializedRelated = JSON.parse(JSON.stringify(relatedBlogs));

  return (
    <ArticleDetail
      article={serializedArticle}
      relatedArticles={serializedRelated}
      userId={userId}
      currentUser={session?.user || null}
      isWished={isWished}
      isLiked={isLiked}
      totalComments={totalComments}
    />
  );
}
