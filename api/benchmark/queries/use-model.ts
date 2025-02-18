import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useModel(payload: { model_name: string }) {
  return useQuery({
    queryKey: ["benchmark", "model", payload],
    queryFn: async () => {
      return await API.model(payload);
    },
  });
}
