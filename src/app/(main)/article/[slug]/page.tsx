import { Suspense } from "react";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/Blog";
import Wish from "@/model/Wish";
import ArticleDetail from "@/modules/article/ArticleDetail";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import type { ArticlePageProps } from "@/types/blog";
import "@/model/Comment";
import { connection } from "next/server";

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  let decodedSlug = slug;
  try {
    decodedSlug = decodeURIComponent(slug);
  } catch {
    return { title: "مقاله یافت نشد | استارفیت" };
  }

  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug: decodedSlug, status: "published" })
      .select("title excerpt image seoTitle seoDescription")
      .lean();

    if (!blog) {
      return { title: "مقاله یافت نشد | استارفیت" };
    }

    const title = blog.seoTitle || blog.title;
    const description =
      blog.seoDescription ||
      blog.excerpt ||
      "مطالعه جدیدترین مقالات تخصصی ورزشی، تغذیه و سلامت در استارفیت";

    return {
      title: `${title} | استارفیت`,
      description,
      openGraph: {
        title: `${title} | استارفیت`,
        description,
        images: blog.image ? [{ url: blog.image }] : [],
      },
    };
  } catch {
    return { title: "مقاله ورزشی | استارفیت" };
  }
}

async function ArticlePageContent({ params }: ArticlePageProps) {
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

  const [relatedBlogs, existingWish] = await Promise.all([
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
    />
  );
}

export default function page(props: ArticlePageProps) {
  return (
    <Suspense fallback={null}>
      <ArticlePageContent {...props} />
    </Suspense>
  );
}
