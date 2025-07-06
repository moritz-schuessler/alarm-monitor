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

const getActiveIncident = async () => {
  const response = await fetch("/api/me");

  const { firetruck } = (await response.json()) as Response;

  return firetruck.activeIncident;
};

export default useMe;
export { getActiveIncident };
