import { Session } from "@/lib/session";
import { useQuery } from "@tanstack/react-query";

const getSession = async () => {
  const response = await fetch("/api/auth/session");
  return (await response.json()) as Session;
};

const useAuth = () => {
  return useQuery({ queryKey: ["session"], queryFn: getSession });
};

export default useAuth;
