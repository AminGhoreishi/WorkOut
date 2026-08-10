import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import FitnessProfile from "@/model/Fitnessprofile";
import OnboardingForm from "@/modules/onboarding/OnboardingForm";
import type { FitnessProfileData } from "@/types/fitness-profile";



export default async function OnboardingPageContent() {
  await connection();
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
  } catch {
    initialProfile = null;
  }

  return <OnboardingForm initialProfile={initialProfile} />;
}
