"use client";

import useIncident from "@/hooks/use-get-incident";
import { redirect, usePathname } from "next/navigation";

interface IncidentGuardProps {
  children: React.ReactNode;
}

const IncidentGuard = ({ children }: IncidentGuardProps) => {
  const pathname = usePathname();
  const { status } = useIncident();

  if (status === "error" && pathname === "/incident") {
    redirect("/select-incident");
  } else if (status === "success" && pathname === "/select-incident") {
    redirect("/incident");
  }

  return <>{children}</>;
};

export default IncidentGuard;
