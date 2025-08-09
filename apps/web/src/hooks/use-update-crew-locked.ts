import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateCrewLocked = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      firetruckId,
      locked,
    }: {
      firetruckId: string;
      locked: boolean;
    }) => {
      const response = await fetch(
        `/api/backend/firetrucks/${firetruckId}/crew`,
        {
          method: "PATCH",
          body: JSON.stringify({
            locked: locked,
          }),
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      return;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["firetruck", variables.firetruckId],
      });
    },
  });
};

export default useUpdateCrewLocked;
