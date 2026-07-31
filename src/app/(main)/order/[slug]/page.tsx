import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import OrderPage from "@/modules/order/OrderPage";
import type { OrderPackageInfo, OrderSlugPageProps } from "@/types/order";

export async function generateMetadata({
  params,
}: OrderSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const pkg = await Package.findOne({ slug, isActive: true })
      .select("name tagline")
      .lean();

    if (!pkg) {
      return {
        title: "استار فیت | پکیج یافت نشد",
      };
    }

    return {
      title: `استار فیت | خرید ${pkg.name}`,
      description:
        pkg.tagline ||
        `تکمیل سفارش و فعال‌سازی آنلاین اشتراک ${pkg.name} در سیستم استار فیت`,
    };
  } catch (error) {
    return {
      title: "استار فیت | تکمیل سفارش",
    };
  }
}

export default async function OrderSlugPage({ params }: OrderSlugPageProps) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/order/${slug}`);
  }

  await dbConnect();

  const slugPackage = await Package.findOne({ slug, isActive: true }).lean();

  if (!slugPackage) {
    notFound();
  }

  const safePackageData: OrderPackageInfo = {
    _id: String(slugPackage._id),
    name: slugPackage.name,
    slug: slugPackage.slug,
    tagline: slugPackage.tagline || "",
    description: slugPackage.description || "",
    price: {
      monthly: slugPackage.price?.monthly || 0,
      quarterly: slugPackage.price?.quarterly || 0,
      biannual: slugPackage.price?.biannual || 0,
    },
    isActive: Boolean(slugPackage.isActive),
  };

  return (
    <OrderPage
      packageData={safePackageData}
      userId={session.user.id}
      email={session.user.email}
    />
  );
}
