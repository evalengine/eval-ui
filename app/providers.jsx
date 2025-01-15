"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ModalProvider } from "@liholiho/react-modal-hook";
import { TransitionGroup } from "react-transition-group";

const providers = [];

const AllProviders = ({ children }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider rootComponent={TransitionGroup}>
        <AllProviders>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </AllProviders>
      </ModalProvider>
    </QueryClientProvider>
  );
}
