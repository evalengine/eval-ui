"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRightFromSquare } from "lucide-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Overview } from "./components/overview";
import { Analytics } from "./components/analytics";
import { Scores } from "./components/scores";
import { Suspense } from "react";

function _Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <>
      <div className="container mx-auto flex-col md:flex border-x border-b pb-4 rounded-b-lg">
        <div className="flex-1 space-y-4 pt-6">
          <Link href={process.env.NEXT_PUBLIC_EXPLORER_URL!} target="_blank">
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
              <TabsTrigger value="scores">Scores</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="analytics" forceMount>
              <Analytics />
            </TabsContent>
            <TabsContent value="scores">
              <Scores />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <>
      <Suspense>
        <_Page />
      </Suspense>
    </>
  );
}
