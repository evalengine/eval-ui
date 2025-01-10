import { useQuery } from "@tanstack/react-query";
import { useWalletProvider } from "@/hooks/useWalletProvider";

export const useStakeBalance = (validatorHotkey, delegatorAddress) => {
  const { api } = useWalletProvider();
  const query = useQuery({
    queryKey: ["stakeBalance", delegatorAddress],
    queryFn: async () => {
      const stakedAmount = await api.query.subtensorModule.stake(
        validatorHotkey,
        delegatorAddress
      );

      // Convert the staked amount from its smallest unit (Rao) to TAO
      // Assuming 1 TAO = 1,000,000,000 Rao
      const stakedAmountInTAO = Number(stakedAmount) / 1000000000;
      return stakedAmountInTAO;
    },
    enabled: !!api && !!delegatorAddress,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    ...query,
    data: query.data || 0,
  };
};
