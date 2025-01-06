'use client'

import { KeysProvider } from "@/components/Header"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"


const providers = [KeysProvider];

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AllProviders>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </AllProviders>
    </QueryClientProvider>
  )
} 