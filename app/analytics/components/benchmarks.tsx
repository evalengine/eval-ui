"use client";

import { useModel } from "@/api/benchmark/queries/use-model";
import { useModels } from "@/api/benchmark/queries/use-models";
import { useStats } from "@/api/benchmark/queries/use-stats";
import { useComparison } from "@/api/benchmark/queries/use-comparison";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Component() {
  const { data: { models } = {} } = useModels();
  // console.log(models!["deepseek-r1"]);
  // const { data: stats } = useStats();
  // const { data: comparison } = useComparison();
  // const { data: model } = useModel({ model_name: "model-1" });
  return (
    <main className="grid gap-4 md:grid-cols-2">
      {Object.keys(models || {}).map((model) => {
        return (
          <Card key={model} className="w-full">
            <CardHeader className="items-center">
              <CardTitle>Performance Analysis for {model}</CardTitle>
              <CardDescription>
                Analyze the performance of your model over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <ChartContainer
                config={chartConfig}
                className="mx-auto"
              >
                <RadarChart
                  data={Object.keys(
                    models![model].category_performance || {}
                  ).map((key) => ({
                    month: key?.replaceAll("_", " ")?.toUpperCase(),
                    desktop: models![model]?.category_performance[key] * 100,
                  }))}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="month" />
                  <PolarGrid />
                  <Radar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    fillOpacity={0.6}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                <TrendingUp size={16} />
                <span>Performance is improving</span>
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                <span>Updated 2 days ago</span>
                <span>•</span>
                <span>View details</span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </main>
  );
}

export function Benchmarks() {
  return <Component />;
}
