import { StationDetails } from "@alarm-monitor/shared/src";
import { useQuery } from "@tanstack/react-query";

const useGetStations = () => {
  const incidentResponse = useQuery({
    queryKey: ["stations"],
    queryFn: () => queryFn(),
  });

  return incidentResponse;
};

const queryFn = async () => {
  const response = await fetch(`/api/backend/stations`);
  return (await response.json()) as StationDetails[];
};

export default useGetStations;
