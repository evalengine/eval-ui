"use client";
import { PostchainClient } from "@/lib/postchain";
import { useState } from "react";

export function useEvalHistory(client: PostchainClient) {
  const [value, setValue] = useState<{
    scores: {scores: any[], pointer: number};
    total: number;
  }>({
    scores: {scores: [], pointer: 0},
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(userAddress: string) {
    if (!client || !userAddress) return;

    setIsLoading(true);
    try {
      const total = await client.getTweetScoresCountByUserAddress(userAddress);
      const scores = await client.getTweetScoresByUserAddress(
        userAddress,
        0,
        total as number,
        Date.now() * 1000
      ) as any[];
      setValue({
        scores: scores,
        total: total as number,
      });
    } catch (error) {
      console.error("Failed to fetch eval history:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return { value, isLoading, fetchData };
}
