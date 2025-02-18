import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useAllScores() {
  return useQuery({
    queryKey: ["eval", "allScores"],
    queryFn: async () => {
      return await API.allScores();
    },
  });
}
