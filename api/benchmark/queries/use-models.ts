import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useModels() {
  return useQuery({
    queryKey: ["benchmark", "models"],
    queryFn: async () => {
      return await API.models();
    },
  });
}
