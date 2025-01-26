"use client";

// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";
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

export function ScoreHistory({ data = [] }: { data: any }) {
  return (
    <>
      {/* <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          // data={chartData}
          // data={[
          //   { month: "January", desktop: 186 },
          //   { month: "February", desktop: 305 },
          //   { month: "March", desktop: 237 },
          //   { month: "April", desktop: 73 },
          //   { month: "May", desktop: 209 },
          //   { month: "June", desktop: 214 },
          // ]}
          data={data.map((score: any, i: any) => ({
            month: i,
            desktop: score.final_score,
          }))}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="desktop"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer> */}
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "#2563eb",
          },
          mobile: {
            label: "Mobile",
            color: "#60a5fa",
          },
        }}
      >
        <BarChart
          data={data.map((score: any, i: any) => ({
            name: i,
            total: score.final_score,
          }))}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar
            dataKey="total"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
