import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useStats() {
  return useQuery({
    queryKey: ["benchmark", "stats"],
    queryFn: async () => {
      return await API.stats();
    },
  });
}
