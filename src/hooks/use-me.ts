import { Firetrucks } from "@/data/schema";
import { useQuery } from "@tanstack/react-query";

interface Response {
  firetruck: Firetrucks;
}

const useMe = () => {
  return useQuery({
    queryKey: ["firetruck/me"],
    queryFn: async () => {
      const response = await fetch("/api/me");
      return (await response.json()) as Response;
    },
  });
};

export default useMe;
