import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Package from "@/models/Package";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    const packages = await Package.find({}, "_id name")
      .sort({ name: 1 })
      .lean();

    return NextResponse.json( packages );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
