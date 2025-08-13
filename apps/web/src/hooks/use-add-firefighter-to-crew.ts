import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFirefighterToCrew = () => {
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
        `/api/backend/firetrucks/${firetruckId}/firefighter`,
        {
          method: "POST",
          body: JSON.stringify({
            firefighterId: firefighterId,
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

export default useAddFirefighterToCrew ;
