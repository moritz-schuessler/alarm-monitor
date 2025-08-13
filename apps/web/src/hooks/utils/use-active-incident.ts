import { useQuery, useQueryClient } from "@tanstack/react-query";

const useActiveIncident = () => {
  const queryClient = useQueryClient();

  return useQuery<string>({
    queryKey: ["active-incident"],
    queryFn: async () => {
      const queryData = queryClient.getQueryData<string>(["active-incident"]);

      if (queryData) {
        return queryData;
      }

      return "";
    },
  });
};

export default useActiveIncident;
