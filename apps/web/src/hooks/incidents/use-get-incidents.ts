import { useQuery } from "@tanstack/react-query";

import { IncidentWithStation } from "@alarm-monitor/shared/src";

const useGetIncidents = () => {
  const incidentResponse = useQuery({
    queryKey: ["incidents"],
    queryFn: () => queryFn(),
  });

  return incidentResponse;
};

const queryFn = async () => {
  const response = await fetch("/api/backend/incidents");
  return (await response.json()) as IncidentWithStation[];
};

export default useGetIncidents;
