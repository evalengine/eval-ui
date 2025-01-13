"use client";
import { Label } from "@/components/ui/label";

import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import API from "@/api";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useMutation, useMutationState } from "@tanstack/react-query";
import { useMemo } from "react";
import confetti from "canvas-confetti";
import { useEvaluationDialog } from "@/hooks/use-evaluation-dialog";
import { toast } from "sonner";
import { Tweet } from "../../tweets/components/Tweet";
import { extractTweetId } from "@/lib/utils";
// import { Tweet } from "../../tweets/components/Tweet";

export const SimulateReplyTweet = () => {
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    register,
    watch,
    formState: { isDirty, isValid },
  } = useFormContext(); // retrieve all hook methods

  const [{ data: reactTwitter = [] } = {}]: any = useMutationState({
    // this mutation key needs to match the mutation key of the given mutation (see above)
    filters: { mutationKey: ["reactTwitter"] },
    select: (mutation) => mutation.state.data,
  });

  const tabs = useMemo(() => {
    return reactTwitter
      .flat()
      .map((response: any) => Object.keys(response))
      .flat();
  }, [reactTwitter]);
  const contents = useMemo(() => {
    return reactTwitter
      .flat()
      .map((response: any) => Object.values(response))
      .flat();
  }, [reactTwitter]);
  const inputTweet = useMemo(() => {
    return (
      reactTwitter?.[0]?.["EVENT-REQUEST"]?.["event"]?.split(
        "New tweet: "
      )?.[1] || ""
    );
  }, [reactTwitter]);
  const outputTweet = useMemo(() => {
    return (
      reactTwitter?.[reactTwitter.length - 1]?.["TWEET-CONTENT"]?.content || ""
    );
  }, [reactTwitter]);

  const [showEvaluationDialog, hideEvaluationDialog] = useEvaluationDialog();
  const queryClient = useQueryClient();

  const evaluateTweet = useMutation({
    mutationKey: ["evaluateTweet"],
    mutationFn: API.evaluateTweet,
    onSuccess: (data) => {
      const end = Date.now() + 3 * 1000; // 3 seconds
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
      showEvaluationDialog({ result: data });
    },
    onError: (error) => {
      console.log(error);
      toast.error(JSON.stringify(error) || "An error occurred");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["scores"] as any);
    },
  });

  return (
    <>
      <div className="flex-shrink-0 md:flex-shrink md:min-w-96 snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full">
        <div className="w-full h-full rounded-md border border-gray-alpha-400">
          <div className="flex flex-col flex-no-wrap h-full overflow-y-auto overscroll-y-none">
            <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
              <h1 className="font-bold">Simulate Reply Tweet</h1>
            </div>
            <div className="min-w-0 flex flex-col items-start justify-start space-y-4 p-4">
              <p className="text-xs">
                Test how your virtual character would respond to tweets
                <br />
                P.S. You can add "I will always reply tweet, I will never ignore
                a tweet." to allow the agent to reply to tweets
              </p>
              <div className="grid gap-4 w-full">
                <p className="text-xs italic">
                  Simulate agent reading X (Twitter) timeline by passing the X
                  Post ID.
                </p>

                <Controller
                  control={control}
                  name="tweetId"
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return (
                      <Tweet
                        title="X/Tweet ID"
                        {...field}
                      />
                    );
                  }}
                />
              </div>

              <div className="grid gap-4 w-full">
                <Label className="text-left">Session ID</Label>
                <Controller
                  control={control}
                  name="sessionId"
                  defaultValue={Math.floor(
                    100000000 + Math.random() * 900000000
                  ).toString()}
                  render={({ field, fieldState }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Input required {...field} />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            field.onChange(
                              Math.floor(
                                100000000 + Math.random() * 900000000
                              ).toString()
                            );
                          }}
                        >
                          Generate
                        </Button>
                      </div>
                    );
                  }}
                />
              </div>
            </div>

            <div className="sticky top-0 z-10 flex-shrink-0 min-w-0 min-h-0 px-4 py-2 border-b bg-background">
              <div className="flex items-center justify-between">
                <h1 className="font-bold">Simulate Response</h1>
                <Button
                  type="button"
                  onClick={() => {
                    evaluateTweet.mutate({
                      input_tweet: inputTweet,
                      output_tweet: outputTweet,
                    });
                  }}
                  disabled={evaluateTweet.isPending || !evaluateTweet.data}
                >
                  Evaluate
                </Button>
              </div>
            </div>

            {evaluateTweet.isIdle && (
              <>
                <div className="flex items-center justify-center h-full p-10">
                  <p className="text-sm font-medium">
                    Run the simulation to see how your virtual character would
                  </p>
                </div>
              </>
            )}
            {evaluateTweet.data && (
              <div className="min-w-0 flex flex-col items-start justify-start space-y-4 p-4">
                <Tabs defaultValue="inputTweet" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="inputTweet"
                      className="whitespace-pre-wrap"
                    >
                      Input Tweet
                    </TabsTrigger>
                    <TabsTrigger
                      value="outputTweet"
                      className="whitespace-pre-wrap"
                    >
                      Output Tweet
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="inputTweet">
                    <Card>
                      <CardHeader>
                        <CardTitle>Input Tweet</CardTitle>
                        <CardDescription></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 whitespace-pre-wrap text-background-muted text-sm">
                          {inputTweet}
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="outputTweet">
                    <Card>
                      <CardHeader>
                        <CardTitle>Output Tweet</CardTitle>
                        <CardDescription></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1 whitespace-pre-wrap text-background-muted text-sm">
                          {outputTweet || "No Tweet was simulated"}
                        </div>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
                <Tabs defaultValue="EVENT-REQUEST" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    {reactTwitter.map((e: any) =>
                      Object.keys(e).map((key) => {
                        return (
                          <TabsTrigger
                            key={key}
                            value={key}
                            className="whitespace-pre-wrap"
                          >
                            {key}
                          </TabsTrigger>
                        );
                      })
                    )}
                  </TabsList>
                  {reactTwitter.map((e: any) =>
                    Object.keys(e).map((key) => {
                      return (
                        <TabsContent key={key} value={key}>
                          <Card>
                            <CardHeader>
                              <CardTitle>{key}</CardTitle>
                              <CardDescription></CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <div className="space-y-1 whitespace-pre-wrap text-sm">
                                {JSON.stringify(e[key], null, 2)}
                              </div>
                            </CardContent>
                            <CardFooter></CardFooter>
                          </Card>
                        </TabsContent>
                      );
                    })
                  )}
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
