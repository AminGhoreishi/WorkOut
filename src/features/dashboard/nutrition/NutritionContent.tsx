import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { connection } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import NutritionTracker from "@/features/dashboard/nutrition/NutritionTracker";

export default async function NutritionPageContent() {
  await connection();
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  
  return <NutritionTracker userId={session.user.id} />;
}
