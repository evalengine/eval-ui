"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEvalHistory } from "@/hooks/postchain/use-eval-history";
import { usePostchainClient } from "@/hooks/postchain/use-postchain-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Analytics() {
  const [userAddress, setUserAddress] = useState("");
  const { client } = usePostchainClient();
  const {
    value,
    isLoading,
    fetchData
  } = useEvalHistory(client!);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Enter user address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <Button onClick={() => fetchData(userAddress)}>Search</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Evaluations
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 6l4 14"/>
              <path d="M12 6v14"/>
              <path d="M8 8v12"/>
              <path d="M4 4v16"/>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {value.total}
            </div>
            <p className="text-xs text-muted-foreground">
              Total evaluations for this address
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Score History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full">
              {value.scores.scores.length > 0 && (
                <div className="flex h-full items-end gap-2">
                  {value.scores.scores.map((score, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded" 
                      style={{
                        height: `${(score.final_score / Math.max(...value.scores.scores.map(s => s.final_score))) * 100}%`,
                        width: `${90 / value.scores.scores.length}%`
                      }}
                      title={`Score: ${score.final_score}`}
                    >
                        {score.final_score}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
