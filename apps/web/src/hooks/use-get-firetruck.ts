import { FiretruckDetails, IncidentDetails } from "@alarm-monitor/shared/src";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

const useGetFiretruck = (firetruckId: string) => {
  const queryClient = useQueryClient();

  const incidentResponse = useQuery({
    queryKey: ["firetruck", firetruckId],
    queryFn: () => queryFn(firetruckId, queryClient),
    enabled: !!firetruckId,
    refetchInterval: 5000,
  });

  return incidentResponse;
};

const queryFn = async (firetruckId: string, queryClient: QueryClient) => {
  const oldFiretruck = queryClient.getQueryData<FiretruckDetails>([
    "firetruck",
    firetruckId,
  ]);

  const firetruck = await getFiretruck(firetruckId);

  if (oldFiretruck !== firetruck) {
    queryClient.setQueryData(["incident"], (oldData: IncidentDetails) => {
      return {
        ...oldData,
        firetrucks: oldData.firetrucks.map((element) =>
          element.id === oldFiretruck?.id ? firetruck : element,
        ),
      };
    });
  }

  return firetruck;
};

const getFiretruck = async (firetruckId: string) => {
  const response = await fetch(`/api/backend/firetrucks/${firetruckId!}`);
  return (await response.json()) as FiretruckDetails;
};

export default useGetFiretruck;
