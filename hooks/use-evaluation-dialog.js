"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useModalWithProps } from "@/hooks/useModalWithProps";
import {
  Label as RELabel,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const useEvaluationDialog = () => {
  const [show, hide] = useModalWithProps(
    ({ onConfirm = () => {}, result = {} } = {}) =>
      ({ in: open, onExited }) => {
        return (
          <Dialog
            open={open}
            onOpenChange={(open) => {
              if (!open) {
                hide();
              }
            }}
          >
            <DialogContent className="w-full max-w-screen-lg overflow-hidden">
              <DialogTitle>Tweet Evaluation Report</DialogTitle>
              <div className="overflow-auto h-96 lg:h-full space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium capitalize">
                      Overall Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center">
                    <ChartContainer
                      config={{}}
                      className="mx-auto aspect-square h-64"
                    >
                      <RadialBarChart
                        data={[
                          {
                            browser: "safari",
                            scores: result.final_score,
                            fill: "hsl(var(--primary))",
                          },
                        ]}
                        startAngle={0}
                        endAngle={
                          result.final_score > 100
                            ? 360
                            : (result.final_score / 100) * 360
                        }
                        innerRadius={80}
                        outerRadius={110}
                      >
                        <PolarGrid
                          gridType="circle"
                          radialLines={false}
                          stroke="none"
                          className="first:fill-muted last:fill-background"
                          polarRadius={[86, 74]}
                        />
                        <RadialBar
                          dataKey="scores"
                          background
                          cornerRadius={10}
                        />
                        <PolarRadiusAxis
                          tick={false}
                          tickLine={false}
                          axisLine={false}
                        >
                          <RELabel
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy + 3}
                                      className="fill-foreground text-4xl font-bold"
                                    >
                                      {result.final_score.toFixed(1)}
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </PolarRadiusAxis>
                      </RadialBarChart>
                    </ChartContainer>

                    <Progress value={result.final_score} />
                    <h1 className="mt-5 mb-3 font-bold">Suggested Response</h1>
                    <p className="text-xs text-muted-foreground">
                      {result.recommended_response}
                    </p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries({
                    truth: result.truth,
                    accuracy: result.accuracy,
                    creativity: result.creativity,
                    engagement: result.engagement,
                  }).map(([category, data]) => (
                    <Card key={category}>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium capitalize">
                          {category}
                        </CardTitle>

                        <small className="font-bold">
                          {data.score.toFixed(1)}
                        </small>
                      </CardHeader>
                      <CardContent>
                        <Progress value={data.score} />
                        <p className="text-xs text-muted-foreground mt-4">
                          {data.rationale}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    []
  );
  return [show, hide];
};
