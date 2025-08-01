import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddFiretruckToIncident = () => {
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
        `/api/firetrucks/${firetruckId}/firefighter`,
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
      return await response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["firetruck", variables.firetruckId],
      });
    },
  });
};

export default useAddFiretruckToIncident;
