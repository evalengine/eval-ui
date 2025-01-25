"use client";

import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";

export function useEvalHistory(client: PostchainClient, userAddress: string) {
  return useQuery({
    queryKey: ["useEvalHistory", userAddress],
    queryFn: async () => {
      const total = await client.getTweetScoresCountByUserAddress(userAddress);
      const scores = (await client.getTweetScoresByUserAddress(
        userAddress,
        0,
        total as number,
        Date.now() * 1000
      )) as any[];
      return {
        scores: scores as any,
        total: total as number,
      };
    },
    enabled: !!client && !!userAddress,
  });
}
