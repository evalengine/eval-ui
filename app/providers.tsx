"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "@liholiho/react-modal-hook";
import { TransitionGroup } from "react-transition-group";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const SetToken = () => {
  useEffect(() => {
    const token = Cookies.get("virtual-jwt-token");
    if (token) {
      localStorage.setItem("virtual-jwt-token", token);
      Cookies.remove("virtual-jwt-token"); // Optionally remove the cookie after setting it in localStorage
    }
  }, []);

  return null;
};

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider rootComponent={TransitionGroup}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
        <SetToken />
      </ModalProvider>
    </QueryClientProvider>
  );
}
