"use client";

import useGetMe from "@/hooks/use-get-me";
import Incident from "./incident";
import useGetStationIncidents from "@/hooks/use-get-station-incidents";

const SelectIncident = () => {
  const { data: me } = useGetMe();
  const { data: incidents, status } = useGetStationIncidents(me?.station?.id);

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
