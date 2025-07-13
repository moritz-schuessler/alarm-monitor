import { Firetrucks } from "@/data/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface Response {
  firetruck: Firetrucks;
}

const useMe = () => {
  const queryClient = useQueryClient();
  const response = useQuery({
    queryKey: ["firetruck/me"],
    queryFn: getMe,
  });

  if (response.data) {
    queryClient.setQueryData(
      ["active-incident"],
      () => response.data.activeIncident,
    );
  }

  return { ...response };
};

const getMe = async () => {
  const response = await fetch("/api/me");

  const { firetruck } = (await response.json()) as Response;

  return firetruck;
};

export default useMe;
export { getMe };
