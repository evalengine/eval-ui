"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { PostchainClient } from "@/lib/postchain";

export function usePostchainClient() {
  const [client, setClient] = useState(null);
  useEffect(() => {
    async function initClient() {
      try {
        const newClient = new PostchainClient();
        await newClient.init();
        setClient(newClient);
      } catch (error) {
        console.error("Failed to initialize client:", error);
      }
    }

    initClient();
  }, []);

  return { client };
}
