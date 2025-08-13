"use client";

import useActiveIncident from "@/hooks/utils/use-active-incident";
import { redirect, usePathname } from "next/navigation";

interface IncidentGuardProps {
  children: React.ReactNode;
}

const IncidentGuard = ({ children }: IncidentGuardProps) => {
  const pathname = usePathname();
  const { data: activeIncident } = useActiveIncident();

  if (!activeIncident && pathname === "/incident") {
    redirect("/select-incident");
  } else if (activeIncident && pathname === "/select-incident") {
    redirect("/incident");
  }

  return <>{children}</>;
};

export default IncidentGuard;
