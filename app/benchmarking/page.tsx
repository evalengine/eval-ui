"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRightFromSquare } from "lucide-react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { SAKModels } from "./components/sak-models";
import { Suspense } from "react";
import { ModelSpeedVSPerformance } from "./components/model-speed";
import { PerformanceAnalysis } from "./components/performance";
import { CustomBarChart } from "./components/bar-chart";

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
            <h2 className="text-3xl font-bold tracking-tight">Benchmarking</h2>
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
            <TabsList className="overflow-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Models</TabsTrigger>
              <TabsTrigger value="benchmarks">
                Solana Agent Kit Models
              </TabsTrigger>
              {/* <TabsTrigger value="barchart">Bar Chart</TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <ModelSpeedVSPerformance />
            </TabsContent>
            <TabsContent value="analytics" forceMount>
              <PerformanceAnalysis />
            </TabsContent>
            <TabsContent value="benchmarks">
              <SAKModels />
            </TabsContent>
            {/* <TabsContent value="barchart">
              <CustomBarChart />
            </TabsContent> */}
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
