"use client";

import { IncidentFromStation } from "@/data/incident/getIncidents";
import { useQuery } from "@tanstack/react-query";

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

  console.log(incidents!.incidents);

  if (incidents?.incidents) {
    return (
      <div className="flex flex-col">
        {incidents.incidents.map((incident) => {
          return <div key={incident.id}>{incident.keyword}</div>;
        })}
      </div>
    );
  }

  return <>Deine Feuerwehr hat aktuell kein Einsatz</>;
};

export default SelectIncident;
