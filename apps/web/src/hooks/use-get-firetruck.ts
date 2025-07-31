import { FiretruckDetails } from "@/data/domains/firetrucks/firetruck.types";
import { useQuery } from "@tanstack/react-query";

const useGetFiretruck = (firetruckId: string) => {
  const incidentResponse = useQuery({
    queryKey: ["firetruck", firetruckId],
    queryFn: () => getFiretruck(firetruckId),
    enabled: !!firetruckId,
    retry: false,
  });

  return incidentResponse;
};

const getFiretruck = async (firetruckId: string) => {
  const response = await fetch(`/api/backend/firetrucks/${firetruckId!}`);
  return (await response.json()) as FiretruckDetails;
};

export default useGetFiretruck;
