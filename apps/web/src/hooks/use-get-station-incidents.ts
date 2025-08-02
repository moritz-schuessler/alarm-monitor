import { Incidents, IncidentsToStations } from "@alarm-monitor/shared/src";
import { useQuery } from "@tanstack/react-query";

interface Response {
  incidents: Incidents;
  incidentsToStations: IncidentsToStations;
}

const useGetStationIncidents = (stationId: string | undefined) => {
  return useQuery({
    queryKey: ["station/me/incidents"],
    queryFn: async () => {
      const response = await fetch(
        `/api/backend/stations/${stationId!}/incidents`,
      );
      return (await response.json()) as Response[];
    },
    enabled: !!stationId,
  });
};

export default useGetStationIncidents;
