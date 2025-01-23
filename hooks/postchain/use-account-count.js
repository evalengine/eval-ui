"use client";

import { useState, useEffect } from "react";

export function useAccountCount(client) {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!client) return;

      try {
        const [v] = await Promise.all([client.getAccountsCount()]);
        setValue(v);
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
