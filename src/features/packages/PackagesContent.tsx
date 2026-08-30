import { connection } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import Packagefeature from "@/models/Packagefeature";
import Discount from "@/models/Discount";
import PackagesGrid from "@/features/packages/PackagesGrid";
import { formatPackagesWithDiscounts } from "./packageHelpers";

export default async function PackagesContent() {
  await connection();
  await dbConnect();

  const now = new Date();

  const [packages, features, directDiscounts] = await Promise.all([
    Package.find({ isActive: true }).lean(),
    Packagefeature.find().lean(),
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

  const packagesWithFeatures = formatPackagesWithDiscounts(
    packages,
    features,
    directDiscounts,
  );

  return <PackagesGrid packages={packagesWithFeatures} />;
}
