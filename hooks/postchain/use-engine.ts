"use client";

import { PostchainClient } from "@/lib/postchain";
import { useState, useEffect } from "react";

export function useEngine(client: PostchainClient) {
  const [value, setValue] = useState<{ engines: {engines: any[], pointer: number}; total: number }>({
    engines: {engines: [], pointer: 0},
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!client) return;

      try {
        const engineCount = (await client.getEngineCount()) as number;
        const engines = (await client.getEngines(engineCount)) as any;
        setValue({
          engines,
          total: engineCount,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [client]);
  return { value, isLoading };
}
