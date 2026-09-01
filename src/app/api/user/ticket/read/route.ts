import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import Ticket from "@/models/Ticket";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز. لطفا وارد شوید." },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const ticketId = body.ticketId || body.id;

    if (!ticketId || !mongoose.Types.ObjectId.isValid(ticketId)) {
      return NextResponse.json(
        { message: "شناسه تیکت نامعتبر است." },
        { status: 400 }
      );
    }

    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticketId, userId: session.user.id },
      { $set: { readNotifications: true } },
      { new: true }
    );

    if (!updatedTicket) {
      return NextResponse.json(
        { message: "تیکت یافت نشد یا دسترسی غیرمجاز است." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "وضعیت اعلان تیکت با موفقیت خوانده شده علامت‌گذاری شد.",
      ticketId,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "خطای سرور" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return PATCH(req);
}
