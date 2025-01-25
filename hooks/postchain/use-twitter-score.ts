"use client";

import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";

export function useTwitterScore(client: PostchainClient) {
  return useQuery({
    queryKey: ["getTweetScoresCount"],
    queryFn: async () => {
      return await client.getTweetScoresCount();
    },
    enabled: !!client,
  });
}
