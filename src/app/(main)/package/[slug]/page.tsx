import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import dbConnect from "@/lib/dbConnect";
import Package from "@/model/Package";
import PackageSlugPageContent from "@/modules/packages/packageDetails/PackageSlugContent";
import type { PackageSlugPageProps } from "@/types/package";

export async function generateStaticParams() {
  try {
    await dbConnect();
    const pkgs = await Package.find({ isActive: true }).select("slug").lean();
    if (pkgs.length > 0) {
      return pkgs.map((pkg) => ({
        slug: pkg.slug,
      }));
    }
  } catch {}
  return [{ slug: "default-package" }];
}

export async function generateMetadata({
  params,
}: PackageSlugPageProps): Promise<Metadata> {
  await connection();
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
  } catch {
    return {
      title: "استار فیت | پکیج ورزشی",
    };
  }
}

export default function PackageSlugPage(props: PackageSlugPageProps) {
  return (
    <Suspense fallback={null}>
      <PackageSlugPageContent {...props} />
    </Suspense>
  );
}
