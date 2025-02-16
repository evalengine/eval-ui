import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";

export function useEngine(client: PostchainClient) {
  return useQuery({
    queryKey: ["getEngines"],
    queryFn: async () => {
      const engineCount = (await client.getEngineCount()) as number;
      const engines = (await client.getEngines(engineCount)) as any;
      return {
        engines,
        total: engineCount,
      };
    },
    enabled: !!client,
  });
}
