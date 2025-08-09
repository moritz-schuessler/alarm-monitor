import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFirefighterFromCrew = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      firetruckId,
      firefighterId,
    }: {
      firetruckId: string;
      firefighterId: string;
    }) => {
      const response = await fetch(
        `/api/backend/firetrucks/${firetruckId}/crew/${firefighterId}`,
        {
          method: "Delete",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      return await response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["firetruck", variables.firetruckId],
      });
    },
  });
};

export default useRemoveFirefighterFromCrew;
