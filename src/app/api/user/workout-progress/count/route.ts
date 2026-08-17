import dbConnect from "@/lib/dbConnect";
import ExerciseProgress from "@/models/ExerciseProgress";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    let userId = req.nextUrl.searchParams.get("userid");

    if (!userId) {
      const session = await getServerSession(authOptions);
      userId = session?.user?.id || null;
    }

    if (!userId) {
      return NextResponse.json(
        { message: "شناسه کاربر الزامی است" },
        { status: 400 }
      );
    }

    const count = await ExerciseProgress.countDocuments({
      userId,
      completed: true,
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message || "خطایی رخ داد" },
      { status: 500 }
    );
  }
}
