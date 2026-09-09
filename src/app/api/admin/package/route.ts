import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import PackageFeature from "@/models/Packagefeature";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const { features, ...packageData } = data;

    if (!packageData.colorClass) {
      const colors = [
        "text-amber-400",
        "text-blue-400",
        "text-purple-400",
        "text-emerald-400",
        "text-cyan-400",
        "text-rose-400",
        "text-orange-400",
        "text-yellow-400",
      ];
      packageData.colorClass = colors[Math.floor(Math.random() * colors.length)];
    }

    const pkg = await Package.create(packageData);

    if (Array.isArray(features) && features.length > 0) {
      await PackageFeature.insertMany(
        features.map((featText: string, index: number) => ({
          packageId: pkg._id,
          name: featText.trim(),
          included: true,
          sortOrder: index,
        }))
      );
    }

    const createdFeatures = await PackageFeature.find({ packageId: pkg._id }).sort({ sortOrder: 1 });

    revalidateTag("packages", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/packages");

    return NextResponse.json({
      success: true,
      package: {
        ...pkg.toObject(),
        features: createdFeatures,
      },
    }, { status: 201 });
  } catch (error: any) {
    const message = error?.message || "Failed to create package";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const packages = await Package.find({}).sort({ createdAt: -1 }).lean();
    const features = await PackageFeature.find({}).lean();

    const packagesWithFeatures = packages.map((pkg) => ({
      ...pkg,
      features: features
        .filter((f) => f.packageId.toString() === pkg._id.toString())
        .sort((a, b) => a.sortOrder - b.sortOrder),
    }));

    return NextResponse.json({ packages: packagesWithFeatures });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
