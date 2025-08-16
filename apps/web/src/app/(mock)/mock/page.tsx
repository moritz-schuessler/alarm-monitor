"use client";

import { Badge } from "@/components/ui/badge";
import useGetIncidents from "@/hooks/incidents/use-get-incidents";
import { formatDate } from "@/lib/date";

const MockPage = () => {
  const { data: incidents } = useGetIncidents();

  return (
    <div className="flex flex-col p-4 gap-8">
      {incidents?.map((incident) => {
        return (
          <section key={incident.id} className="flex flex-col gap-2">
            <h2 className="flex gap-4 text-xl font-bold">
              <div>{incident?.keyword}</div>
              <div>{incident.adress}</div>
              <div>{formatDate(incident.alarmTime)}</div>
            </h2>
            <div className="flex gap-4 text-lg font-medium">
              {incident.incidentsToStations.map((incidentToStation) => {
                return (
                  <Badge
                    key={incidentToStation.stationId}
                    variant="secondary"
                    className="flex gap-2"
                  >
                    <div>{incidentToStation.station.name}</div>
                  </Badge>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MockPage;
