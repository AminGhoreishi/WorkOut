import AdminAiChat from "@/modules/admin/ai/AdminAiChat";

export const metadata = {
  title: "هوش مصنوعی مدیریت | پیشخوان",
  description: "دستیار هوش مصنوعی پیشرفته برای مدیریت پکیج‌ها، برنامه‌ها و کاربران",
};

export default function AdminAiPage() {
  return (
    <div className="p-4 md:p-6 min-h-[calc(100vh-4rem)]">
      <AdminAiChat />
    </div>
  );
}
