import LiveStatsCard from "./LiveStatsCard";
import { getHomeStats } from "@/lib/homeData";

export default async function LiveStatsCardSection() {
  const stats = await getHomeStats();
  return <LiveStatsCard stats={stats} />;
}
