import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";
import { RawGtv } from "postchain-client";

export function useEngines(client: PostchainClient, engineCount: number | RawGtv) {
  return useQuery({
    queryKey: ["getEngines"],
    queryFn: async () => {
      return await client.getEngines(engineCount);
    },
    enabled: !!client && typeof engineCount === "number",
  });
}
