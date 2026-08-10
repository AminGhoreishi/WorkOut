import type { Metadata } from "next";
import LoginForm from "@/modules/auth/LoginForm";

export const metadata: Metadata = {
  title: "ورود یا ثبت‌نام | استارفیت",
  description: "ورود و ثبت‌نام در سامانه اختصاصی فیتنس و بدنسازی استارفیت",
};

export default function page() {
  return <LoginForm />;
}
