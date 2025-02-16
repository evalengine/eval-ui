import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useComparison() {
  return useQuery({
    queryKey: ["benchmark", "comparison"],
    queryFn: async () => {
      return await API.comparison();
    },
  });
}
