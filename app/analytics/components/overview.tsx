"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { usePostchainClient } from "@/api/postchain/queries/use-postchain-client";
import { useAccountCount } from "@/api/postchain/queries/use-account-count";
import { useTwitterScore } from "@/api/postchain/queries/use-twitter-score";
import { useEngines } from "@/api/postchain/queries/use-engines";
import { useEngineCount } from "@/api/postchain/queries/use-engine-count";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function Overview() {
  const { client } = usePostchainClient();
  const { data: accountCount, isPending: isLoadingAccountCount } =
    useAccountCount(client!);
  const { data: twitterScore, isPending: isLoadingTwitterScore } =
    useTwitterScore(client!);
  const { data: engineCount, isPending: isLoadingEngineCount } = useEngineCount(
    client!
  );
  const { data: { engines = [] } = {} as any, isPending: isLoadingEngines } =
    useEngines(client!, engineCount!);

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
              {!isLoadingEngineCount ? (
                engineCount?.toString()
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
          <CardDescription>
            List of all engines registered on the network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {engines.map((engine: any, key: number) => (
              <Card key={key}>
                <div className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-100 ring-1 ring-inset ring-gray-500/50 whitespace-nowrap">
                      Prefix
                    </span>
                    <span>{engine.prefix}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-red-100 ring-1 ring-inset ring-red-500/50 whitespace-nowrap">
                      Description
                    </span>
                    <span>{engine.description}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-yellow-100 ring-1 ring-inset ring-yellow-500/50 whitespace-nowrap">
                      ID
                    </span>
                    <span>{engine.id}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-green-100 ring-1 ring-inset ring-green-500/50 whitespace-nowrap">
                      Created
                    </span>
                    <span>{new Date(engine.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-blue-100 ring-1 ring-inset ring-blue-500/50 whitespace-nowrap">
                      Updated
                    </span>
                    <span>{new Date(engine.updated_at).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between space-x-4">
                    <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-indigo-100 ring-1 ring-inset ring-indigo-500/50 whitespace-nowrap">
                      Address
                    </span>
                    <span className="truncate">
                      {engine.address.toString("hex")}
                    </span>
                  </div>
                </div>
              </Card>
            ))}

            {isLoadingEngines && <Skeleton className="min-h-64 h-full" />}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
