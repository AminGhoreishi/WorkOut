import { Suspense } from "react";
import { authOptions } from "@/lib/auth";
import WorkoutProgram from "@/modules/subscription/WorkoutProgram";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";

async function SubscriptionPageContent() {
  await connection();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/workout/full`, {
    headers: { cookie: cookieStore.toString() },
  });

  const result = await res.json();

  return <WorkoutProgram plan={result.plan} days={result.days} />;
}

export default function page() {
  return (
    <Suspense fallback={null}>
      <SubscriptionPageContent />
    </Suspense>
  );
}
