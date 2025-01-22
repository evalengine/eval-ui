"use client";

import { PostchainClient } from "@/lib/postchain";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function AnalyticsPage() {
  const [client, setClient] = useState<PostchainClient | null>(null);
  const [twitterScores, setTwitterScores] = useState(0);
  const [accountsCount, setAccountsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    async function fetchData() {
      if (!client) return;

      try {
        const [scores, accounts] = await Promise.all([
          client.getTweetScoresCount(),
          client.getAccountsCount(),
        ]);
        setTwitterScores(scores as number);
        setAccountsCount(accounts as number);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [client]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      <div className="my-8 p-4 bg-muted rounded-lg">
        <a
          href="https://explorer.chromia.com/mainnet/9E7D8243FE78287588E112384F8DC5F3E1CD35D48FD3BE41E46D8F17DD0BED65"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View real time logs on Chromia Explorer</span>
        </a>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Total Twitter Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2" />
            ) : (
              <>
                <div className="text-4xl font-bold mb-2">
                  {new Intl.NumberFormat().format(twitterScores)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total scores processed
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-muted-foreground">
              Total Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2" />
            ) : (
              <>
                <div className="text-4xl font-bold mb-2">
                  {new Intl.NumberFormat().format(accountsCount)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Total registered accounts
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
