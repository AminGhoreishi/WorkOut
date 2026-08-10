import { notFound } from "next/navigation";
import { connection } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import Packagefeature from "@/model/Packagefeature";
import PackageDetails from "@/modules/packages/packageDetails/PackageDetails";
import type { PackageSlugPageProps } from "@/types/package";

export default async function PackageSlugPageContent({ params }: PackageSlugPageProps) {
  await connection();
  const { slug } = await params;

  await dbConnect();

  const packageFind = await Package.findOne({ slug, isActive: true }).lean();

  if (!packageFind) {
    notFound();
  }

  const features = await Packagefeature.find({
    packageId: packageFind._id,
  }).lean();

  const safePackage = JSON.parse(JSON.stringify(packageFind));
  const safeFeatures = JSON.parse(JSON.stringify(features));

  return (
    <PackageDetails
      package={safePackage}
      features={safeFeatures}
    />
  );
}
