import { Firetrucks } from "@/data/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Response {
  firetruck: Firetrucks;
}

const useMe = () => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["firetruck/me"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      return (await response.json()) as Response;
    },
  });

  if (response.data) {
    queryClient.setQueryData(
      ["active-incident"],
      () => response.data.firetruck.activeIncident,
    );
  }

  return { ...response };
};

export default useMe;
