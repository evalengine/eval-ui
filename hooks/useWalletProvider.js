import { useContext } from "react";

import { WalletContext } from "@/contexts/wallet";
// This hook can be used to access the user info.
export function useWalletProvider() {
  return useContext(WalletContext);
}
