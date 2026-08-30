import { notFound } from "next/navigation";
import { connection } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import Packagefeature from "@/models/Packagefeature";
import Discount from "@/models/Discount";
import PackageDetails from "@/features/packages/packageDetails/PackageDetails";
import { formatSinglePackageWithDiscounts } from "@/features/packages/packageHelpers";
import type { PackageSlugPageProps } from "@/types/package";

export default async function PackageSlugPageContent({ params }: PackageSlugPageProps) {
  await connection();
  const { slug } = await params;

  await dbConnect();

  const now = new Date();

  const [packageFind, directDiscounts] = await Promise.all([
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

  if (!packageFind) {
    notFound();
  }

  const features = await Packagefeature.find({
    packageId: packageFind._id,
  }).lean();

  const formattedPackage = formatSinglePackageWithDiscounts(
    packageFind,
    directDiscounts,
  );

  const safePackage = JSON.parse(JSON.stringify(formattedPackage));
  const safeFeatures = JSON.parse(JSON.stringify(features));

  return (
    <PackageDetails
      package={safePackage}
      features={safeFeatures}
    />
  );
}
