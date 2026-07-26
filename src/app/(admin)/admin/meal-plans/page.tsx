import MealPlansManagement from "@/modules/admin/meal-plan/MealPlansManagement";

export const metadata = {
  title: "استار فیت | برنامه‌ریزی غذایی پکیج‌ها - مدیریت",
  description: "تعریف و مدیریت برنامه‌های غذایی پکیج‌ها در پنل مدیریت استار فیت",
};

export default function AdminMealPlansPage() {
  return <MealPlansManagement />;
}
