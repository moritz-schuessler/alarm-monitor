import { IncidentEntity } from "@alarm-monitor/shared/src";
import { useQuery } from "@tanstack/react-query";

const useGetStationIncidents = (stationId: string | undefined) => {
  return useQuery({
    queryKey: ["station/me/incidents"],
    queryFn: async () => {
      const response = await fetch(
        `/api/backend/stations/${stationId!}/incidents`,
      );
      return (await response.json()) as IncidentEntity[];
    },
    enabled: !!stationId,
  });
};

export default useGetStationIncidents;
