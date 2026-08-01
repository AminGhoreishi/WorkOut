import UserProfileManagement from "@/modules/dashboard/profile/UserProfileManagement";

export const metadata = {
  title: "استارفیت | پروفایل من",
  description: "ویرایش اطلاعات حساب کاربری و تغییر رمز عبور در استارفیت",
};

export default function ProfilePage() {
  return <UserProfileManagement />;
}
