import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFiretruckToIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      firetruckId,
      incidentId,
    }: {
      firetruckId: string;
      incidentId: string;
    }) => {
      const response = await fetch(`/api/firetrucks/${firetruckId}/incident`, {
        method: "POST",
        body: JSON.stringify({
          incidentId: incidentId,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-incident"] });
    },
  });
};

export default useAddFiretruckToIncident;
