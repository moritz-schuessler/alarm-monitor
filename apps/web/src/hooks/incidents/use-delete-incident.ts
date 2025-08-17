import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ incidentId }: { incidentId: string }) => {
      const response = await fetch(`/api/backend/incidents/${incidentId}`, {
        method: "Delete",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      return;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["incidents"],
      });
    },
  });
};

export default useDeleteIncident;
