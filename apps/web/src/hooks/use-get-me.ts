import { StationDetails } from "@/data/domains/stations/station.types";
import { Firetrucks } from "@/data/shared/schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface MeResponse {
  firetruck: Firetrucks;
  station: StationDetails;
}

const useGetMe = () => {
  const queryClient = useQueryClient();
  const response = useQuery<MeResponse>({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (response.data) {
    queryClient.setQueryData(["active-incident"], (oldData) => {
      if (oldData !== response.data.firetruck.activeIncident) {
        return response.data.firetruck.activeIncident;
      }
      return oldData;
    });
  }

  return { ...response };
};

const getMe = async () => {
  const response = await fetch("/api/backend/me");
  console.log("test");

  return (await response.json()) as MeResponse;
};

export default useGetMe;
export { getMe };
