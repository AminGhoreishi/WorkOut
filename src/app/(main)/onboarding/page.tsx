import { redirect } from "next/navigation";
import OnboardingForm from "@/modules/onboarding/OnboardingForm";
import dbConnect from "@/lib/dbConnect";
import FitnessProfile from "@/model/Fitnessprofile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import type { FitnessProfileData } from "@/types/fitness-profile";

export const metadata = {
  title: "استار فیت | تکمیل مشخصات ورزشی",
  description:
    "برای شخصی‌سازی برنامه‌های ورزشی و تغذیه، لطفاً مشخصات فیزیکی و ورزشی خود را در این بخش تکمیل کنید.",
};

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/onboarding");
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
  } catch (error) {
    initialProfile = null;
  }

  return <OnboardingForm initialProfile={initialProfile} />;
}
