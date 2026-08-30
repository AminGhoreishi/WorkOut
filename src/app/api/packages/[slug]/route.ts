import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import Discount from "@/models/Discount";
import { formatSinglePackageWithDiscounts } from "@/features/packages/packageHelpers";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  await dbConnect();

  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Package slug is required" }, { status: 400 });
  }

  try {
    const now = new Date();
    const [packageData, directDiscounts] = await Promise.all([
      Package.findOne({ slug }).lean(),
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

    if (!packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    const formattedPackage = formatSinglePackageWithDiscounts(
      packageData,
      directDiscounts,
    );

    return NextResponse.json(formattedPackage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

