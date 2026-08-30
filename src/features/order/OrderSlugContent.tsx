import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import Discount from "@/models/Discount";
import OrderPage from "@/features/order/OrderPage";
import { formatSinglePackageWithDiscounts } from "@/features/packages/packageHelpers";
import type { OrderPackageInfo, OrderSlugPageProps } from "@/types/order";

export { default as OrderPageSkeleton } from "./OrderPageSkeleton";

export default async function OrderSlugPageContent({ params }: OrderSlugPageProps) {
  await connection();
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/login?callbackUrl=/order/${slug}`);
  }

  await dbConnect();

  const now = new Date();

  const [slugPackage, directDiscounts] = await Promise.all([
    Package.findOne({ slug, isActive: true }).lean(),
    Discount.find({
      code: null,
      isActive: true,
      startsAt: { $lte: now },
      $and: [
        {
          $or: [{ expiresAt: null }, { expiresAt: { $gte: now } }],
        },
      ],
    }).lean(),
  ]);

  if (!slugPackage) {
    notFound();
  }

  const formattedPackage = formatSinglePackageWithDiscounts(
    slugPackage,
    directDiscounts,
  );

  const safePackageData: OrderPackageInfo = {
    _id: String(formattedPackage._id),
    name: formattedPackage.name,
    slug: formattedPackage.slug,
    tagline: formattedPackage.tagline || "",
    description: formattedPackage.description || "",
    price: {
      monthly: formattedPackage.price?.monthly || 0,
      quarterly: formattedPackage.price?.quarterly || 0,
      biannual: formattedPackage.price?.biannual || 0,
    },
    originalPrice: formattedPackage.originalPrice,
    discountPercent: formattedPackage.discountPercent,
    hasDiscount: formattedPackage.hasDiscount,
    isActive: Boolean(formattedPackage.isActive),
  };

  return (
    <OrderPage
      packageData={safePackageData}
      userId={session.user.id}
      email={session.user.email}
    />
  );
}
