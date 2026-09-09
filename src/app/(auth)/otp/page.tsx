import { Suspense } from "react";
import type { Metadata } from "next";
import OtpForm from "@/features/auth/OtpForm";

export const metadata: Metadata = {
  title: "تایید کد ورود",
  description: "تایید کد یک‌بار مصرف جهت ورود به حساب کاربری استارفیت",
};

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center text-amber-400 font-danaMed ss02 text-xs sm:text-sm">
          بارگذاری...
        </div>
      }
    >
      <OtpForm />
    </Suspense>
  );
}
