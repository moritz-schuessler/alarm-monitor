import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const useSelectedStats = () => {
  const searchParams = useSearchParams();

  return useQuery<string[]>({
    queryKey: ["selected-stats"],
    queryFn: () => {
      const stats = searchParams.get("stats");
      return stats ? stats.split(",") : [];
    },
  });
};

export default useSelectedStats;
