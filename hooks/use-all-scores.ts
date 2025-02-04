"use client";

import { useQuery } from "@tanstack/react-query";
import API from "@/api";

export function useAllScores() {
  return useQuery({
    queryKey: ["allScores"],
    queryFn: async (payload) => {
      return await API.allScores(payload);
    },
  });
}
