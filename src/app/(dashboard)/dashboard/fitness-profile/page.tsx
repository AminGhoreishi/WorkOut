import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import FitnessProfile from "@/models/Fitnessprofile";
import FitnessProfileManagement from "@/features/dashboard/fitness-profile/FitnessProfileManagement";
import type { FitnessProfileData } from "@/types/fitness-profile";

export const metadata: Metadata = {
  title: "پروفایل ورزشی من | استار فیت",
  description:
    "مشاهده و ویرایش مشخصات فیزیکی، اهداف ورزشی و سابقه تمرین در استار فیت",
};

export default async function FitnessProfilePage() {
  await connection();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/dashboard/fitness-profile");
  }

  let initialProfile: FitnessProfileData | null = null;

  try {
    await dbConnect();
    const profile = await FitnessProfile.findOne({
      userId: session.user.id,
    }).lean();

    if (profile) {
      initialProfile = {
        goal: profile.goal,
        sessionsPerWeek: profile.sessionsPerWeek,
        equipment: profile.equipment,
        trainingExperience: profile.trainingExperience,
        ageYears: profile.ageYears,
        heightCm: profile.heightCm,
        weightKg: profile.weightKg,
        bodyPhotos: profile.bodyPhotos || [],
        notes: profile.notes || "",
      };
    }
  } catch {
    initialProfile = null;
  }

  return <FitnessProfileManagement initialProfile={initialProfile} />;
}
