"use client";

import { IncidentFromStation } from "@/data/incident/getIncidents";
import { useQuery } from "@tanstack/react-query";
import Incident from "./incident";

interface Response {
  incidents: IncidentFromStation[];
}

const SelectIncident = () => {
  const { data: incidents, status } = useQuery({
    queryKey: ["incidents"],
    queryFn: async () => {
      const response = await fetch("/api/me/station/incidents");
      return (await response.json()) as Response;
    },
  });

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (incidents?.incidents) {
    return (
      <div className="flex gap-4">
        {incidents.incidents.map((incident) => {
          return <Incident key={incident.id} incident={incident} />;
        })}
      </div>
    );
  }

  return <>Deine Feuerwehr hat aktuell kein Einsatz</>;
};

export default SelectIncident;
