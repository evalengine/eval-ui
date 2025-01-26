"use client";

import { PostchainClient } from "@/lib/postchain";
import { useQuery } from "@tanstack/react-query";

export function useAccountCount(client: PostchainClient) {
  return useQuery({
    queryKey: ["getAccountsCount"],
    queryFn: async () => {
      return await client.getAccountsCount();
    },
    enabled: !!client,
  });
}
