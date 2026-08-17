import FitnessProfileManagement from "@/features/dashboard/fitness-profile/FitnessProfileManagement";

export const metadata = {
  title: "استارفیت | پروفایل ورزشی من",
  description:
    "مشاهده و ویرایش مشخصات فیزیکی، اهداف ورزشی و سابقه تمرین در استارفیت",
};

export default function FitnessProfilePage() {
  return <FitnessProfileManagement />;
}
