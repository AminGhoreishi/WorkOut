import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadFileToS3 } from "@/lib/arvan";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "coach")
    ) {
      return NextResponse.json({ message: "دسترسی غیرمجاز" }, { status: 403 });
    }

    let userId = "";
    let subject = "";
    let description = "";
    let category = "";
    let status = "coach_sent";
    let file: File | null = null;

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      userId = (formData.get("userId") as string) || "";
      subject = (formData.get("subject") as string) || "";
      description = (formData.get("description") as string) || "";
      category = (formData.get("category") as string) || "";
      status = (formData.get("status") as string) || "coach_sent";
      file = formData.get("file") as File | null;
    } else {
      const body = await req.json();
      userId = body.userId || "";
      subject = body.subject || "";
      description = body.description || "";
      category = body.category || "";
      status = body.status || "coach_sent";
    }

    if (!userId || !subject || !description || !category) {
      return NextResponse.json(
        { message: "انتخاب کاربر، موضوع، متن پیام و دسته‌بندی الزامی است." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "شناسه کاربر نامعتبر است." },
        { status: 400 }
      );
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return NextResponse.json(
        { message: "کاربر مورد نظر یافت نشد." },
        { status: 404 }
      );
    }

    const validCategories = [
      "workout",
      "nutrition",
      "form_check",
      "injury",
      "technical",
    ];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: "دسته‌بندی انتخاب شده نامعتبر است." },
        { status: 400 }
      );
    }

    let videoUrl = "";
    if (file && file instanceof File && file.size > 0) {
      videoUrl = await uploadFileToS3(file, "tickets");
    }

    const adminUser = await User.findById(session.user.id);
    const senderName =
      adminUser?.fullName ||
      adminUser?.username ||
      session.user.username ||
      "پشتیبان استار فیت";

    const ticket = await Ticket.create({
      userId: targetUser._id,
      coachId: session.user.id,
      initiatedBy: "coach",
      subject: subject.trim(),
      description: description.trim(),
      category,
      videoUrl: videoUrl || undefined,
      status,
      messages: [
        {
          senderId: session.user.id,
          senderName,
          text: description.trim(),
          createdAt: new Date(),
        },
      ],
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("userId", "username fullName email avatar role")
      .populate("coachId", "username fullName email avatar role")
      .populate("messages.senderId", "username fullName email avatar role")
      .lean();

    fetch(
      "https://ydge4rrdrdrdrdr.app.n8n.cloud/webhook/c8f6c1ff-99c4-4497-9cd6-e77ebcd25488",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: "admin_ticket_created",
          ticket: populatedTicket,
          targetUser,
          admin: session.user,
        }),
      }
    ).catch(() => {});

    return NextResponse.json(
      {
        success: true,
        ticket: populatedTicket,
        message: "تیکت با موفقیت برای کاربر ارسال شد.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}
