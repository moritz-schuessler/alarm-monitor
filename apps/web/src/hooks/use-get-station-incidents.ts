import {
  IncidentEntity,
  IncidentToStationEntity,
} from "@alarm-monitor/shared/src";
import { useQuery } from "@tanstack/react-query";

interface Response {
  incidents: IncidentEntity;
  incidentsToStations: IncidentToStationEntity;
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
