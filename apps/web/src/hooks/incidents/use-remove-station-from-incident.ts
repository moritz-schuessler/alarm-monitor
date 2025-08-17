import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveStationFromIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      incidentId,
      stationId,
    }: {
      incidentId: string;
      stationId: string;
    }) => {
      const response = await fetch(
        `/api/backend/incidents/${incidentId}/stations/${stationId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incidents"] });
    },
  });
};

export default useRemoveStationFromIncident;
