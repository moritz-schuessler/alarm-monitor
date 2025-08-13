"use client";

import useActiveIncident from "@/hooks/utils/use-active-incident";
import { redirect, usePathname } from "next/navigation";

interface IncidentGuardProps {
  children: React.ReactNode;
}

const IncidentGuard = ({ children }: IncidentGuardProps) => {
  const pathname = usePathname();

  const { data: activeIncident, isPending } = useActiveIncident();

  if (!isPending && pathname === "/incident") {
    if (!activeIncident) {
      redirect("/select-incident");
    }
  }

  if (!isPending && pathname === "/select-incident") {
    if (activeIncident) {
      redirect("/incident");
    }
  }

  return <>{children}</>;
};

export default IncidentGuard;
