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

import { Label } from "@/components/ui/label";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { extractTweetId } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const useEvaluationDialog = () => {
  const [show, hide] = useModalWithProps(
    ({ onConfirm = () => {}, result = {} } = {}) =>
      ({ in: open, onExited }) => {
        const original_tweet_id = extractTweetId(result.original_tweet);
        const responded_tweet_id = extractTweetId(result.responded_tweet);
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
              <div className="overflow-auto h-96 lg:h-[calc(100dvh-156px)] space-y-4">
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
                            // fill: "hsl(var(--primary))",
                            fill: "#fff",
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
                    <h1 className="mt-5 mb-3 text-muted-foreground">Suggested Response</h1>
                    <p className="text-sm font-bold">
                      {result.recommended_response}
                    </p>
                  </CardContent>
                </Card>

                <div className="flex w-full p-2 space-x-2 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-y-hidden">
                  <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md bg-background-100 w-full">
                    <div className="w-full rounded-md border border-gray-alpha-400">
                      <div className="flex flex-col flex-no-wrap overflow-y-auto overscroll-y-none">
                        <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
                          <Label>Original Tweet</Label>
                        </div>
                        <div className="min-w-0 flex items-center justify-center p-4">
                          <div style={{ zoom: 1 }}>
                            {original_tweet_id ? (
                              <ClientTweetCard id={original_tweet_id} />
                            ) : (
                              <p>{result.original_tweet}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md bg-background-100 w-full">
                    <div className="w-full rounded-md border border-gray-alpha-400">
                      <div className="flex flex-col flex-no-wrap overflow-y-auto overscroll-y-none">
                        <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
                          <Label>Response Tweet</Label>
                        </div>
                        <div className="min-w-0 flex items-center justify-center p-4">
                          <div style={{ zoom: 1 }}>
                            {responded_tweet_id ? (
                              <ClientTweetCard id={responded_tweet_id} />
                            ) : (
                              <p>{result.original_tweet}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                        <Accordion type="single" collapsible>
                          <AccordionItem value={category}>
                            <AccordionTrigger>
                              <Progress value={data.score} />
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-xs text-muted-foreground mt-4">
                                {data.rationale}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
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
