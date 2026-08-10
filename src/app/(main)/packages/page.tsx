import { Suspense } from "react";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import Packagefeature from "@/model/Packagefeature";
import SubscriptionPackages from "@/modules/packages/SubscriptionPackages";
import PackagesGrid, { PackagesSkeleton } from "@/modules/packages/PackagesGrid";
import { connection } from "next/server";

async function PackagesContent() {
  await connection();
  await dbConnect();
  const packages = await Package.find({ isActive: true }).lean();
  const features = await Packagefeature.find().lean();

  const packagesWithFeatures = packages.map((pkg) => ({
    _id: pkg._id.toString(),
    name: pkg.name,
    slug: pkg.slug,
    price: pkg.price.monthly,
    popular: pkg.isPopular,
    duration: "اشتراک دوره",
    features: features
      .filter((f) => f.packageId.toString() === pkg._id.toString())
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((f) => ({
        _id: f._id.toString(),
        packageId: f.packageId.toString(),
        name: f.name,
        description: f.description,
        included: f.included,
        sortOrder: f.sortOrder,
      })),
  }));

  return <PackagesGrid packages={packagesWithFeatures} />;
}

export default function page() {
  return (
    <SubscriptionPackages>
      <Suspense fallback={<PackagesSkeleton />}>
        <PackagesContent />
      </Suspense>
    </SubscriptionPackages>
  );
}
