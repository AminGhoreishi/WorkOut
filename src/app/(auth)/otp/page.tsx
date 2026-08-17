import type { Metadata } from "next";
import OtpForm from "@/features/auth/OtpForm";

export const metadata: Metadata = {
  title: "تایید کد ورود | استارفیت",
  description: "تایید کد یک‌بار مصرف جهت ورود به حساب کاربری استارفیت",
};

export default function page() {
  return <OtpForm />;
}
