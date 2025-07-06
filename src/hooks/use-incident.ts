import { Firetrucks, Incidents } from "@/data/schema";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

type Response = Incidents;

type MeResponse = {
  firetruck: Firetrucks;
};

const useIncident = () => {
  const queryClient = useQueryClient();

  const incidentResponse = useQuery({
    queryKey: ["incident"],
    queryFn: () => queryFunction(queryClient),
  });

  return incidentResponse;
};

const queryFunction = async (queryClient: QueryClient) => {
  const activeIncident = await queryClient.ensureQueryData({
    queryKey: ["active-incident"],
    queryFn: getActiveIncident,
  });

  const response = await fetch(`/api/incidents/${activeIncident!}`);
  return (await response.json()) as Response;
};

const getActiveIncident = async () => {
  const response = await fetch("/api/me");

  const { firetruck } = (await response.json()) as MeResponse;

  return firetruck.activeIncident;
};

export default useIncident;
