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

const ScoreCard = ({ label, percentage, color, rationale, scoreLabel }) => {
  const totalDots = 10; // Total number of dots
  const filledDots = Math.round((percentage / 100) * totalDots); // Calculate the number of filled dots
  const emptyDots = totalDots - filledDots; // Remaining dots are empty

  return (
    <div className="flex flex-col bg-zinc-900 p-4 rounded-xl">
      {/* <Accordion type="single" collapsible>
        <AccordionItem>
          <AccordionTrigger> */}
      <div className="flex items-center justify-between">
        <div>
          {/* Dots */}
          <div className="flex space-x-1">
            {[...Array(filledDots)].map((_, i) => (
              <div
                key={`filled-${i}`}
                className={`w-4 h-4 rounded-full ${color}`}
              ></div>
            ))}
            {[...Array(emptyDots)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-4 h-4 rounded-full bg-zinc-700"
              ></div>
            ))}
          </div>
          {/* Label */}
          <div className="mt-2 font-medium capitalize">{label}</div>
        </div>

        {/* Percentage */}
        <div className="text-3xl font-bold ml-6">{scoreLabel}</div>
      </div>
      {/* </AccordionTrigger> */}

      {/* <AccordionContent> */}
      <div className="text-xs text-muted-foreground mt-4">{rationale}</div>
      {/* </AccordionContent>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};

export const useEvaluationDialog = () => {
  const [show, hide] = useModalWithProps(
    ({ onConfirm = () => { }, result = {} } = {}) =>
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
                <ScoreCard
                  label="Overall"
                  percentage={result.final_score}
                  scoreLabel={
                    <>
                      <h1 className="text-5xl">
                        {result.final_score.toFixed(1)}
                      </h1>
                    </>
                  }
                  color="bg-white"
                  rationale={
                    <>
                      <h1 className="mt-5 mb-3 text-muted-foreground">
                        Suggested Response
                      </h1>
                      <p className="text-sm font-bold">
                        {result.recommended_response}
                      </p>
                    </>
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
                  {Object.entries({
                    truth: result.truth,
                    accuracy: result.accuracy,
                    creativity: result.creativity,
                    engagement: result.engagement,
                  }).map(([category, data]) => (
                    <ScoreCard
                      key={category}
                      label={category}
                      percentage={data.score}
                      scoreLabel={
                        <>
                          <h1 className="text-3xl">{data.score.toFixed(1)}</h1>
                        </>
                      }
                      color={
                        {
                          truth: "bg-pink-500",
                          accuracy: "bg-green-500",
                          creativity: "bg-blue-500",
                          engagement: "bg-yellow-500",
                        }[category]
                      }
                      rationale={data.rationale}
                    />
                  ))}
                </div>
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
                              <p className="break-all">{result.original_tweet}</p>
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
                              <p className="break-all">{result.responded_tweet}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
