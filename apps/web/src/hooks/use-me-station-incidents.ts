import { Incidents, IncidentsToStations } from "@/data/shared/schema";
import { useQuery } from "@tanstack/react-query";
import useGetMe from "./use-get-me";

interface Response {
  incidents: Incidents;
  incidentsToStations: IncidentsToStations;
}

const useMeStationIncidents = () => {
  const { data } = useGetMe();

  return useQuery({
    queryKey: ["station/me/incidents"],
    queryFn: async () => {
      const response = await fetch(
        `/api/backend/stations/${data?.station?.id}/incidents`,
      );
      return (await response.json()) as Response[];
    },
    enabled: !!data,
  });
};

export default useMeStationIncidents;
