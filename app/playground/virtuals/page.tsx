"use client";
import { History } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { CharacterDetails } from "./components/CharacterDetails";
import { SimulateReplyTweet } from "./components/SimulateReplyTweet";

import {
  APISettings,
  useAPISettingsDialog,
  useIsJWTExpired,
} from "@/components/api-settings";
import { useForm, FormProvider } from "react-hook-form";

import { Suspense, useMemo } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { Sidebar } from "@/components/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useQuery } from "@tanstack/react-query";
import API from "@/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import { useEvaluationDialog } from "@/hooks/use-evaluation-dialog";
import { extractTweetId } from "@/lib/utils";
dayjs.extend(relativeTime);
dayjs.extend(isToday);

function Playground() {
  const { data: { data: getVirtual } = {} } = useQuery({
    queryKey: ["getVirtual"],
    queryFn: API.getVirtual,
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      sessionId: Math.floor(100000000 + Math.random() * 900000000).toString(),
    },
    values: {
      customFunctions: [],
      name: getVirtual?.name || "",
      description: getVirtual?.game?.description || "",
      functions: getVirtual?.game?.functions || [],
      goal: getVirtual?.game?.goal || "",
      worldInfo: getVirtual?.game?.worldInfo || "",
      tweetId: "",
    },
  });
  const { isSidebarOpen, openSidebar, closeSidebar, toggleSidebar } =
    useSidebar();

  const queryClient = useQueryClient();

  const reactTwitter = useMutation({
    // mutationKey: ["reactTwitter"],
    mutationFn: API.reactTwitter,
    onSuccess: (response) => {
      queryClient.setQueryData(
        ["reactTwitter"] as any,
        () => response?.data || []
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error(JSON.stringify(error) || "An error occurred");
    },
  });

  const { data: { scores = [] } = {} } = useQuery({
    queryKey: ["scores"],
    queryFn: API.scores,
  });

  const groupScoresByDate = useMemo(() => {
    return scores.reduce((acc: any, score: any) => {
      const date = dayjs(score.created_at).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(score);

      return acc;
    }, {});
  }, [scores]);

  const { data = "" } = useQuery({
    queryKey: ["virtual-jwt-token"],
    queryFn: async () => {
      return localStorage.getItem("virtual-jwt-token") || "";
    },
  });

  const isJWTExpired = useIsJWTExpired(data || "");
  const [showAPISettingsDialog, hideAPISettingsDialog] = useAPISettingsDialog(
    {}
  );
  const [showEvaluationDialog, hideEvaluationDialog] = useEvaluationDialog();

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => {
            if (isJWTExpired) {
              showAPISettingsDialog();
              return;
            }
            const id = extractTweetId(values.tweetId!);
            reactTwitter.mutate({
              data: {
                ...values,
                tweetId: id || values.tweetId,
                sessionId: Math.floor(
                  100000000 + Math.random() * 900000000
                ).toString(),
              },
            });
          })}
        >
          <div className="flex flex-row w-full">
            <div className="hidden z-30 sticky top-[56px] flex-shrink-0 border-r w-14 bg-background px-4 md:flex flex-col items-center justify-between h-[calc(100dvh-56px)]">
              <aside className="flex flex-col gap-3 sticky top-[56px] py-4">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      onClick={toggleSidebar}
                    >
                      <History className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>History</p>
                  </TooltipContent>
                </Tooltip>
              </aside>
            </div>
            <div className="sticky top-[56px] z-20 bottom-0 w-0">
              <Sidebar className="border-r w-[260px] hidden flex-col flex-shrink-0 pb-4 bg-background h-[calc(100dvh-56px)] overflow-hidden md:flex sticky -translate-x-[261px] duration-300 ease-in-out data-[state=open]:translate-x-0 top-[56px] left-[56px]">
                <div className="flex items-center justify-between p-5 text-sm border-b h-14">
                  <strong className="text-gray-alpha-1000">History</strong>

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={closeSidebar}
                  >
                    <svg
                      strokeLinejoin="round"
                      viewBox="0 0 16 16"
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.14647 7.2929C2.75595 7.68343 2.75595 8.31659 3.14647 8.70712L6.96969 12.5303L7.50002 13.0607L8.56068 12L8.03035 11.4697L4.56068 8.00001L8.03035 4.53034L8.56068 4.00001L7.50002 2.93935L6.96969 3.46968L3.14647 7.2929ZM8.14647 7.2929C7.75595 7.68343 7.75595 8.31659 8.14647 8.70712L11.9697 12.5303L12.5 13.0607L13.5607 12L13.0304 11.4697L9.56068 8.00001L13.0304 4.53034L13.5607 4.00001L12.5 2.93935L11.9697 3.46968L8.14647 7.2929Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </Button>
                </div>

                <div className="overflow-auto h-full flex-grow py-4 space-y-4 text-xs">
                  {Object.keys(groupScoresByDate).map((date) => {
                    return (
                      <div key={date} className="">
                        <div className="flex items-center justify-between px-6">
                          <strong className="text-gray-alpha-1000">
                            {dayjs(date).isToday()
                              ? "Today"
                              : dayjs(date).fromNow()}
                          </strong>
                        </div>
                        <div className="py-2">
                          {groupScoresByDate[date].map((score: any) => (
                            <div
                              key={score.id}
                              className="flex items-center justify-between px-2"
                            >
                              <Button
                                type="button"
                                variant="ghost"
                                className="w-full justify-start"
                                onClick={() => {
                                  showEvaluationDialog({ result: score });
                                }}
                              >
                                <div className="truncate">
                                  {score.original_tweet}
                                </div>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Sidebar>
            </div>
            <div className="w-full md:w-[calc(100dvw-56px)]">
              <div className="flex overflow-hidden h-[calc(100svh-56px)]">
                <div className="flex flex-col flex-1 h-full overflow-x-auto bg-background">
                  <div className="flex flex-row items-center justify-between px-6 py-2">
                    <h2 className="text-lg font-semibold whitespace-nowrap">
                      Virtuals Sandbox
                    </h2>
                    <div className="flex w-full space-x-2 justify-end">
                      <APISettings />
                      <Button type="submit" disabled={reactTwitter.isPending}>
                        Simulate Reply
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full h-full p-2 space-x-2 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-y-hidden">
                    <CharacterDetails />
                    <SimulateReplyTweet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default function Page() {
  return (
    <Suspense>
      <Playground />
    </Suspense>
  );
}
