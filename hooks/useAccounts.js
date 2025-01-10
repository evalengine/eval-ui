import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccounts = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      return queryClient.getQueryData(["accounts"]) || [];
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
