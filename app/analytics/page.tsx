"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRightFromSquare } from "lucide-react";
import { Metrics } from "./components/metrics";
import { Analytics } from "./components/analytics";
import Link from "next/link";
import { PageProps } from "@/.next/types/app/page";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto flex-col md:flex">
        <div className="flex-1 space-y-4 pt-6">
          <Link
            href={
              process.env.NEXT_PUBLIC_EXPLORER_URL ||
              "https://explorer.chromia.com/mainnet/9E7D8243FE78287588E112384F8DC5F3E1CD35D48FD3BE41E46D8F17DD0BED65"
            }
            target="_blank"
          >
            <Alert>
              <ArrowUpRightFromSquare className="h-4 w-4" />
              <AlertTitle>Chromia Explorer</AlertTitle>
              <AlertDescription>
                View real time logs on Chromia Explorer
              </AlertDescription>
            </Alert>
          </Link>
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <div className="flex items-center space-x-2"></div>
          </div>
          <Tabs
            defaultValue="overview"
            className="space-y-4"
            value={searchParams.get("t") || "overview"}
            onValueChange={(t) => {
              router.push(`?t=${t}`);
            }}
          >
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Metrics />
            </TabsContent>
            <TabsContent value="analytics" forceMount>
              <Analytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
