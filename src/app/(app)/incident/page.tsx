"use client";

import { Incidents } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";

interface Response {
  incident: Incidents;
}

const IncidentPage = () => {
  const { data, status } = useQuery({
    queryKey: ["active-incident"],
    queryFn: async () => {
      const response = await fetch("/api/me/incident");
      return (await response.json()) as Response;
    },
  });

  if (status === "pending") {
    return "...Loading";
  }

  const incident = data!.incident;

  return (
    <div>
      <div>Aktueller Einsatz:</div>
      <div>{incident.keyword}</div>
    </div>
  );
};

export default IncidentPage;
