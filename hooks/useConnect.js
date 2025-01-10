import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "./useAccount";
import { useAccounts } from "@/hooks/useAccounts";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import { toast } from "sonner";

export const useConnect = () => {
  const queryClient = useQueryClient();
  const disconnect = async () => {
    await queryClient.cancelQueries();
    await queryClient.resetQueries();
    queryClient.getMutationCache().clear();
    queryClient.clear();
  };
  const connect = useMutation({
    mutationKey: ["connect"],
    mutationFn: async () => {
      try {
        const enable = await web3Enable("chasm-staking-app");
        const accounts = await web3Accounts();

        if (enable.length === 0)
          throw new Error("No Polkadot extension installed");
        return {
          enable,
          accounts,
        };
      } catch (e) {
        console.error(e);
        toast.custom((t) => (
          <div className="p-2 bg-blue-600 rounded-lg flex justify-between items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <path
                d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 7.4V11H8.6V7.4H7.4ZM7.4 5V6.2H8.6V5H7.4Z"
                fill="white"
              />
            </svg>
            <div className="text-white text-sm">
              If your wallet is not responding, try to refresh the page. Or
              install the Polkadot extension.
            </div>
            <button
              onClick={() => {
                toast.dismiss(t);
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M8 7.15164L10.97 4.18164L11.8184 5.03004L8.8484 8.00004L11.8184 10.97L10.97 11.8184L8 8.84844L5.03 11.8184L4.1816 10.97L7.1516 8.00004L4.1816 5.03004L5.03 4.18164L8 7.15164Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        ));
        throw e;
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["accounts"], data.accounts);
      if (data.accounts.length === 0) return;

      const cachedAccount = localStorage.getItem("account") ?? null;
      if (cachedAccount) {
        queryClient.setQueryData(["account"], cachedAccount);
        return;
      }
      queryClient.setQueryData(["account"], data.accounts[0].address);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const { data: address } = useAccount();
  const { data: accounts } = useAccounts();

  return {
    ...connect,
    disconnect,
    connected: !!address && accounts !== undefined,
  };
};
