import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "./Header";

export default async function HeaderWrapper() {
  const session = await getServerSession(authOptions);
  return <Header session={session} />;
}
