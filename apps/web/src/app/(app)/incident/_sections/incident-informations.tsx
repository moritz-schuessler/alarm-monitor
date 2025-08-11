"use client";

import { formatDate } from "@/lib/date";
import { InfoCard } from "@/components/ui/card/info-card";
import useIncident from "@/hooks/use-get-incident";

const IncidentInformations = () => {
  const { data } = useIncident();

  const incident = data?.incident;

  return (
    <>
      <h2 className="p-4">Einsatzinformationen</h2>
      <div className="grid grid-cols-[repeat(3,minmax(auto,1fr))] gap-0.25">
        <InfoCard description="Stichwort" value={incident?.keyword} />
        <InfoCard description="Adresse" value={incident?.adress} />
        <InfoCard
          description="Alarmzeit"
          value={incident?.alarmTime && formatDate(incident.alarmTime)}
        />
      </div>
    </>
  );
};

export default IncidentInformations;
