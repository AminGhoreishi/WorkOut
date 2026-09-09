import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import mongoose from "mongoose";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import "@/models/User";
import Blog from "@/models/Blog";
import Wish from "@/models/Wish";
import Comment from "@/models/Comment";
import ArticleDetail from "@/features/article/ArticleDetail";
import type { ArticlePageProps, ArticleDetailData } from "@/types/blog";

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
      .select("-likedUsers -viewedUsers")
      .populate("authorId", "username fullName role")
      .lean(),
  ]);

  if (!blog) {
    notFound();
  }

  const userId = session?.user?.id || null;
  const isValidUserId = Boolean(
    userId && mongoose.Types.ObjectId.isValid(userId)
  );

  const [relatedBlogs, existingWish, isLikedDoc, totalComments] =
    await Promise.all([
      Blog.find({
        category: blog.category,
        status: "published",
        _id: { $ne: blog._id },
      })
        .select("title slug image category content createdAt")
        .sort({ createdAt: -1 })
        .limit(3)
        .lean(),
      isValidUserId
        ? Wish.findOne({ userId, blogId: blog._id }).lean()
        : null,
      isValidUserId
        ? Blog.exists({ _id: blog._id, likedUsers: userId })
        : null,
      Comment.countDocuments({ blogId: blog._id, isApproved: true }),
    ]);

  const isWished = Boolean(existingWish);
  const isLiked = Boolean(isLikedDoc);

  const serializedArticle: ArticleDetailData = {
    ...blog,
    _id: String(blog._id),
    authorId: blog.authorId
      ? {
          _id: String(blog.authorId._id),
          username: blog.authorId.username,
          fullName: blog.authorId.fullName,
          role: blog.authorId.role,
        }
      : null,
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toISOString()
      : undefined,
    updatedAt: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : undefined,
    publishDate: blog.publishDate
      ? new Date(blog.publishDate).toISOString()
      : null,
    likes: typeof blog.likes === "number" ? blog.likes : 0,
  };

  const serializedRelated: ArticleDetailData[] = relatedBlogs.map(
    (item: any) => ({
      ...item,
      _id: String(item._id),
      createdAt: item.createdAt
        ? new Date(item.createdAt).toISOString()
        : undefined,
    })
  );

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
