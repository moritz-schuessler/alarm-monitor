"use client";

import Incident from "./incident";
import useMeStationIncidents from "@/hooks/use-me-station-incidents";

const SelectIncident = () => {
  const { data: incidents, status } = useMeStationIncidents();

  if (status === "pending") {
    return <div>...Loading</div>;
  }

  if (incidents!.length) {
    return (
      <div className="flex gap-4">
        {incidents!.map(({ incidents: incident }) => {
          return <Incident key={incident.id} incident={incident} />;
        })}
      </div>
    );
  }

  return <>Deine Feuerwehr hat aktuell kein Einsatz</>;
};

export default SelectIncident;
