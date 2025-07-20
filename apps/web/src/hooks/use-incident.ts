import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMe } from "./use-me";
import { type IncidentDetails } from "@/data/domains/incident/incident.types";

const useIncident = () => {
  const queryClient = useQueryClient();

  const incidentResponse = useQuery({
    queryKey: ["incident"],
    queryFn: () => getIncident(queryClient),
    retry: false,
  });

  return incidentResponse;
};

const getIncident = async (queryClient: QueryClient) => {
  const activeIncident = await queryClient.ensureQueryData({
    queryKey: ["active-incident"],
    queryFn: async () => {
      const response = await getMe();

      queryClient.setQueryData(["firetruck/me"], () => response);

      return response.activeIncident;
    },
  });

  if (!activeIncident) {
    throw new Error("no-incident");
  }

  const response = await fetch(`/api/incidents/${activeIncident!}`);
  return (await response.json()) as IncidentDetails;
};

export default useIncident;
