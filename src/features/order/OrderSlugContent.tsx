import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import OrderPage from "@/features/order/OrderPage";
import type { OrderPackageInfo, OrderSlugPageProps } from "@/types/order";

export function OrderPageSkeleton() {
  return (
    <div className="min-h-screen bg-black text-amber-50 px-3 sm:px-6 py-6 sm:py-12 relative overflow-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto relative z-10 animate-pulse">
        <div className="mb-6 sm:mb-8 space-y-3">
          <div className="h-4 bg-zinc-800 rounded w-32" />
          <div className="h-8 bg-zinc-800 rounded w-64" />
          <div className="h-4 bg-zinc-800 rounded w-80" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/60 border border-amber-500/10 rounded-2xl p-6 h-48" />
            <div className="bg-zinc-900/60 border border-amber-500/10 rounded-2xl p-6 h-64" />
          </div>
          <div className="lg:col-span-1">
            <div className="bg-zinc-900/80 border border-amber-500/10 rounded-2xl p-6 h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function OrderSlugPageContent({ params }: OrderSlugPageProps) {
  await connection();
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
