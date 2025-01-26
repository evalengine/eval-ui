"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePostchainClient } from "@/hooks/postchain/use-postchain-client";
import { useAccountCount } from "@/hooks/postchain/use-account-count";
import { useTwitterScore } from "@/hooks/postchain/use-twitter-score";
import { useEngine } from "@/hooks/postchain/use-engine";

import { DataTable } from "./engines/data-table";
import { columns } from "./engines/columns";
import { Separator } from "@/components/ui/separator";

export function Metrics() {
  const { client } = usePostchainClient();
  const { data: accountCount, isPending: isLoadingAccountCount } =
    useAccountCount(client!);
  const { data: twitterScore, isPending: isLoadingTwitterScore } =
    useTwitterScore(client!);
  const { data: engine, isPending: isLoadingEngine } = useEngine(client!);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Accounts
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {!isLoadingAccountCount && typeof twitterScore === "number" ? (
                (accountCount as number)
              ) : (
                <Skeleton className="w-10 h-6" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total registered accounts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Twitter Scores
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
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {!isLoadingTwitterScore && typeof twitterScore === "number" ? (
                twitterScore
              ) : (
                <Skeleton className="w-10 h-6" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total scores processed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engines</CardTitle>
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
              <path d="M16 6l4 14" />
              <path d="M12 6v14" />
              <path d="M8 8v12" />
              <path d="M4 4v16" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {!isLoadingEngine ? (
                engine?.total
              ) : (
                <Skeleton className="w-10 h-6" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total engines registered
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Engines</CardTitle>
          <CardDescription>Engines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {engine?.engines.engines.map((engine: any, key: number) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-base">{engine.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {engine.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">Prefix:</span>
                      <span>{engine.prefix}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">Description:</span>
                      <span>{engine.description}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">ID:</span>
                      <span>{engine.id}</span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">Created:</span>
                      <span>
                        {new Date(engine.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">Updated:</span>
                      <span>
                        {new Date(engine.updated_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between space-x-4">
                      <span className="font-medium">Address:</span>
                      <span className="truncate">
                        {engine.address.toString("hex")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {isLoadingEngine && <Skeleton className="min-h-64 h-full" />}
          </div>
        </CardContent>
      </Card>
      {/* <Separator /> */}
    </>
  );
}
