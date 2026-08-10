import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/Blog";
import ArticlePageContent from "@/modules/article/ArticleSlugContent";
import ArticleSkeleton from "@/modules/article/ArticleSkeleton";
import type { ArticlePageProps } from "@/types/blog";

export async function generateStaticParams() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ status: "published" }).select("slug").lean();
    if (blogs.length > 0) {
      return blogs.map((blog) => ({
        slug: blog.slug,
      }));
    }
  } catch {}
  return [{ slug: "default-article" }];
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  await connection();
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

export default function page(props: ArticlePageProps) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticlePageContent {...props} />
    </Suspense>
  );
}
