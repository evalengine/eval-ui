import { useQuery } from "@tanstack/react-query";
import { useWalletProvider } from "@/hooks/useWalletProvider";

export const useBalance = (address) => {
  const { api } = useWalletProvider();
  // console.log("useBalance", address, api);
  const query = useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      const {
        data: { free },
      } = await api.query.system.account(address);

      // Assuming TAO uses 9 decimal places, adjust as needed
      const decimals = 9;
      // Convert the BigInt to a Number for division - be cautious about precision loss
      // for very large numbers.
      const balanceInTAO = Number(free) / Math.pow(10, decimals);

      // Now balanceInTAO is a Number and supports toFixed
      //   const formattedBalance = balanceInTAO.toFixed(3); // Displays the balance with 4 decimal places
      return balanceInTAO;
    },
    enabled: !!api && !!address,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    data: query.data || 0,
  };
};
