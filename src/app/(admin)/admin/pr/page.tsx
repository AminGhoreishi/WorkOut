import PersonalRecords from "@/features/admin/pr/PersonalRecords";
import type { AdminPRPageProps } from "@/types/pr";

export const metadata = {
  title: "استار فیت | رکوردهای شخصی (PR) - مدیریت",
  description: "مدیریت رکوردهای شخصی (PR) در پنل مدیریت استار فیت",
};

export default async function AdminPRPage({ searchParams }: AdminPRPageProps) {
  const { userId } = await searchParams;
  return <PersonalRecords userId={userId} />;
}
