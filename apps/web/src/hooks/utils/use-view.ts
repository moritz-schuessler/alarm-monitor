import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

const useView = () => {
  const searchParams = useSearchParams();

  return useQuery<string>({
    queryKey: ["view"],
    queryFn: async () => {
      return searchParams.get("view") ?? "firetruck";
    },
  });
};

export default useView;
