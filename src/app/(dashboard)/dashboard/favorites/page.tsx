import { Suspense } from "react";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import WishModel from "@/model/Wish";
import FavoritesManagement from "@/modules/dashboard/favorites/FavoritesManagement";
import type { FavoriteArticleItem } from "@/types/favorites";

export const metadata = {
  title: "استارفیت | مقالات علاقه‌مندی‌های من",
  description:
    "مدیریت و مشاهده مقالات علمی و ورزشی نشانه‌گذاری شده در استارفیت",
};

async function FavoritesContent() {
  try {
    await dbConnect();
  } catch {
    redirect("/login");
  }

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const dbWishlist = await WishModel.find({ userId: session.user.id })
    .populate("blogId")
    .lean();

  const wishlistProps: FavoriteArticleItem[] = (dbWishlist || [])
    .map((w: any) => {
      const b = w.blogId;
      if (!b) return null;
      return {
        id: b._id?.toString() || "",
        title: b.title || "",
        slug: b.slug || "",
        image: b.image || "",
        category: b.category || "مقاله",
        views: b.views || 0,
      };
    })
    .filter(
      (item): item is FavoriteArticleItem => item !== null && Boolean(item.id),
    );

  return <FavoritesManagement initialWishlist={wishlistProps} />;
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <FavoritesContent />
    </Suspense>
  );
}
