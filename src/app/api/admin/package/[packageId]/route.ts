import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";
import PackageFeature from "@/models/Packagefeature";
import Subscription from "@/models/Subscription";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const packageId = resolvedParams.packageId;

    const data = await req.json();
    const { features, ...packageData } = data;

    const pkg = await Package.findByIdAndUpdate(
      packageId,
      { ...packageData },
      { new: true, runValidators: true }
    );

    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    if (Array.isArray(features)) {
      await PackageFeature.deleteMany({ packageId });
      if (features.length > 0) {
        await PackageFeature.insertMany(
          features.map((featText: string, index: number) => ({
            packageId,
            name: featText.trim(),
            included: true,
            sortOrder: index,
          }))
        );
      }
    }

    const updatedFeatures = await PackageFeature.find({ packageId }).sort({ sortOrder: 1 });

    revalidateTag("packages", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/packages");

    return NextResponse.json({
      success: true,
      package: {
        ...pkg.toObject(),
        features: updatedFeatures,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update package" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ packageId: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const packageId = resolvedParams.packageId;

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return NextResponse.json({ error: "پکیج یافت نشد" }, { status: 404 });
    }

    const activeSubCount = await Subscription.countDocuments({
      packageId,
      status: { $in: ["trial", "active"] },
    });

    if ((pkg.studentCount && pkg.studentCount > 0) || activeSubCount > 0) {
      return NextResponse.json(
        {
          error:
            "این پکیج دارای کاربران دارای اشتراک فعال است و امکان حذف آن وجود ندارد. لطفاً پکیج را در وضعیت «غیرفعال» قرار دهید.",
        },
        { status: 400 }
      );
    }

    await Package.findByIdAndDelete(packageId);
    await PackageFeature.deleteMany({ packageId });

    revalidateTag("packages", { expire: 0 });
    revalidatePath("/");
    revalidatePath("/packages");

    return NextResponse.json({
      success: true,
      message: "پکیج با موفقیت حذف شد",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "خطا در حذف پکیج" },
      { status: 500 }
    );
  }
}
