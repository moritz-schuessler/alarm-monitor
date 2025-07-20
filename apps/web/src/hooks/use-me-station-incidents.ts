import { Incidents, IncidentsToStations } from "@/data/shared/schema";
import { useQuery } from "@tanstack/react-query";

interface Response {
  incidents: Incidents;
  incidentsToStations: IncidentsToStations;
}

const useMeStationIncidents = () => {
  return useQuery({
    queryKey: ["station/me/incidents"],
    queryFn: async () => {
      const response = await fetch("/api/me/station/incidents");
      return (await response.json()) as Response[];
    },
  });
};

export default useMeStationIncidents;
