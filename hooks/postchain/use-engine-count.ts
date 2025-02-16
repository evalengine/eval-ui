import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";

export function useEngineCount(client: PostchainClient) {
  return useQuery({
    queryKey: ["getEngineCount"],
    queryFn: async () => {
      return await client.getEngineCount();
    },
    enabled: !!client,
  });
}
