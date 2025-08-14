import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFiretruckFromIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ firetruckId }: { firetruckId: string }) => {
      const response = await fetch(
        `/api/backend/firetrucks/${firetruckId}/incident`,
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
      queryClient.invalidateQueries();
    },
  });
};

export default useRemoveFiretruckFromIncident;
