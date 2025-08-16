import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateIncident = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      keyword,
      adress,
    }: {
      keyword: string;
      adress: string;
    }) => {
      const response = await fetch(`/api/backend/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          adress,
        }),
      });

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

export default useCreateIncident;
