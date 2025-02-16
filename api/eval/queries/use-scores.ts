import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useComparison() {
  return useQuery({
    queryKey: ["eval", "scores"],
    queryFn: async () => {
      return await API.scores();
    },
  });
}
