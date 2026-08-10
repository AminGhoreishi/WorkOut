import WorkoutPlansList from "./WorkoutPlansList";
import { getHomePlans } from "@/lib/homeData";

export default async function WorkoutPlansCardsSection() {
  const plans = await getHomePlans();
  return <WorkoutPlansList plans={plans} />;
}
