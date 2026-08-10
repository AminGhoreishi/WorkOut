import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import Packagefeature from "@/model/Packagefeature";
import PackageDetails from "@/modules/packages/packageDetails/PackageDetails";
import type { PackageSlugPageProps } from "@/types/package";
import { connection } from "next/server";

export async function generateMetadata({
  params,
}: PackageSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const pkg = await Package.findOne({ slug, isActive: true })
      .select("name tagline description")
      .lean();

    if (!pkg) {
      return {
        title: "استار فیت | پکیج یافت نشد",
      };
    }

    return {
      title: `استار فیت | پکیج ${pkg.name}`,
      description:
        pkg.tagline ||
        pkg.description ||
        `اطلاعات کامل و ویژگی‌های پکیج ورزشی ${pkg.name} در استار فیت`,
    };
  } catch (error) {
    return {
      title: "استار فیت | پکیج ورزشی",
    };
  }
}

async function PackageSlugPageContent({ params }: PackageSlugPageProps) {
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

export default function PackageSlugPage(props: PackageSlugPageProps) {
  return (
    <Suspense fallback={null}>
      <PackageSlugPageContent {...props} />
    </Suspense>
  );
}
