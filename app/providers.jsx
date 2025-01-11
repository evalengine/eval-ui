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

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

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
