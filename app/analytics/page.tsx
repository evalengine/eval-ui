import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CalendarDateRangePicker } from "./components/date-range-picker"
import { Overview } from "./components/overview";
import { RecentLogs } from "./components/recent-logs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};
import { Metrics } from "./components/metrics";
import { Analytics } from "./components/analytics";
export default function DashboardPage() {
  return (
    <>
      <div className="container mx-auto flex-col md:flex">
        {/* <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div> */}
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
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Metrics />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card> */}
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Recent logs</CardTitle>
                    <CardDescription>
                      The most recent logs from your operations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentLogs />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <Analytics />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
