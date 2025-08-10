import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ensureMe } from "../use-get-me";

const useSelectedFiretruck = () => {
  const queryClient = useQueryClient();

  return useQuery<string>({
    queryKey: ["selected-firetruck"],
    queryFn: async () => {
      const queryData = queryClient.getQueryData<string>([
        "selected-firetruck",
      ]);

      if (queryData) {
        return queryData;
      }

      const me = await ensureMe(queryClient);
      return me.firetruck.id;
    },
  });
};

export default useSelectedFiretruck;
