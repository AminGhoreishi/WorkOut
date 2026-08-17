import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما وارد سیستم نشده‌اید." },
        { status: 401 }
      );
    }

    const testimonials = await Testimonial.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, testimonials }, { status: 200 });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message || "خطایی رخ داد" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "شما وارد سیستم نشده‌اید." },
        { status: 401 }
      );
    }

    const { badge, rating, comment, achievement } = await req.json();

    if (!comment || !comment.trim()) {
      return NextResponse.json(
        { message: "متن نظر نباید خالی باشد." },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id).select("name email role").lean();
    const name = user?.name || session.user.name || "ورزشکار استارفیت";
    const role = "شاگرد استارفیت";

    const newTestimonial = await Testimonial.create({
      userId: session.user.id,
      name,
      role,
      badge: badge?.trim() || "تجربه ورزشکار",
      rating: Number(rating) || 5,
      comment: comment.trim(),
      achievement: achievement?.trim() || "",
      isVisible: true,
    });

    return NextResponse.json(
      { success: true, testimonial: newTestimonial },
      { status: 201 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json(
      { message: err.message || "خطایی رخ داد" },
      { status: 500 }
    );
  }
}
