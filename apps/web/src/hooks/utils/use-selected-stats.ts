import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useSelectedStats = () => {
  const searchParams = useSearchParams();

  return useQuery<string[]>({
    queryKey: ["selected-stats"],
    queryFn: () => {
      return searchParams.get("stats")?.split(",") ?? [];
    },
  });
};

export default useSelectedStats;
