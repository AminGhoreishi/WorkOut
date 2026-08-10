import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import MobileAuthClient from "./MobileAuthClient";

interface MobileAuthProps {
  onClose?: () => void;
}

export default async function MobileAuth({ onClose }: MobileAuthProps) {
  const session = await getServerSession(authOptions);
  return <MobileAuthClient session={session} onClose={onClose} />;
}
