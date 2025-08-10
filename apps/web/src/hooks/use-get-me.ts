import {
  FiretruckEntity,
  StationWithFirefighters,
} from "@alarm-monitor/shared/src";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";

interface MeResponse {
  firetruck: FiretruckEntity;
  station: StationWithFirefighters;
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
  return (await response.json()) as MeResponse;
};

const ensureMe = async (queryClient: QueryClient) => {
  return await queryClient.ensureQueryData<MeResponse>({
    queryKey: ["me"],
    queryFn: getMe,
  });
};

export default useGetMe;
export { getMe, ensureMe };
