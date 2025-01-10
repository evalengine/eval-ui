import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useAccount = () => {
  const queryClient = useQueryClient();
  const account = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      return queryClient.getQueryData(["account"]) ?? null;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const switchAccount = (address) => {
    localStorage.setItem("account", address);
    queryClient.setQueryData(["account"], address);
  };

  return {
    ...account,
    switchAccount,
  };
};
