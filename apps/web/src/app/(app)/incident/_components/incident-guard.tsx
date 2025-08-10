"use client";

import useIncident from "@/hooks/use-get-incident";
import { useRouter } from "next/navigation";

interface IncidentGuardProps {
  children: React.ReactNode;
}

const IncidentGuard = ({ children }: IncidentGuardProps) => {
  const router = useRouter();
  const { status } = useIncident();

  if (status === "error") {
    router.push("/select-incident");
  }

  return <>{children}</>;
};

export default IncidentGuard;
