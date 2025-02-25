import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useSAKModels() {
  return useQuery({
    queryKey: ["benchmark", "models", "solana-agent-kit"],
    queryFn: async () => {
      return await API.sakModels();
    },
  });
}
