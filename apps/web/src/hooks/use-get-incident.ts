import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { IncidentDetails } from "@alarm-monitor/shared/src";

import { getMe } from "./use-get-me";

const useIncident = () => {
  const queryClient = useQueryClient();

  const incidentResponse = useQuery({
    queryKey: ["incident"],
    queryFn: () => queryFn(queryClient),
  });

  return incidentResponse;
};

const queryFn = async (queryClient: QueryClient) => {
  const activeIncident = await queryClient.ensureQueryData({
    queryKey: ["active-incident"],
    queryFn: async () => {
      const response = await getMe();

      queryClient.setQueryData(["me"], () => response);

      return response.firetruck.activeIncident;
    },
  });

  if (!activeIncident) {
    throw new Error("no-incident");
  }

  const incident = await getIncident(activeIncident);

  incident.firetrucks.forEach((firetruck) => {
    queryClient.setQueryData(["firetruck", firetruck.id], firetruck);
  });

  return incident;
};

const getIncident = async (incidentId: string) => {
  const response = await fetch(`/api/backend/incidents/${incidentId!}`);
  return (await response.json()) as IncidentDetails;
};

export default useIncident;
