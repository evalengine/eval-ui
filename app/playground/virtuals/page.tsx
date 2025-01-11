"use client";
import { Metadata } from "next";
import Image from "next/image";
import { RotateCcw, Plus, History, Link } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import { CodeViewer } from "./components/code-viewer";
import { MaxLengthSelector } from "./components/maxlength-selector";
import { ModelSelector } from "./components/model-selector";
import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
import { PresetShare } from "./components/preset-share";
import { TemperatureSelector } from "./components/temperature-selector";
import { TopPSelector } from "./components/top-p-selector";
import { models, types } from "./data/models";
import { presets } from "./data/presets";
import { Panels } from "./components/c-tweet";
import { Evaluate } from "./components/evaluate";
import { Input } from "@/components/ui/input";
import { APISettings } from "./components/api-settings";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Settings } from "lucide-react";
import { useModalWithProps } from "@/hooks/useModalWithProps";
import { useEffect, useMemo } from "react";

// export const metadata: Metadata = {
//   title: "Playground",
//   description: "The OpenAI Playground built using the components.",
// };

import { useMutation } from "@tanstack/react-query";
import confetti from "canvas-confetti";

const useEvaluationDialog = () => {
  const [show, hide] = useModalWithProps(
    ({ onConfirm = () => {}, result = {} } = {} as any) =>
      ({ in: open, onExited }: any) => {
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
                  <CardContent className="flex flex-col items-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 flex items-center justify-center mb-4 bg-black/70">
                      <p className="text-3xl md:text-4xl font-bold">
                        {result.final_score.toFixed(1)}
                      </p>
                    </div>

                    <Progress value={result.final_score} />
                    <h1 className="mt-5 mb-3">Suggested Response</h1>
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

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4 text-muted-foreground"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                          />
                        </svg>
                      </CardHeader>
                      <CardContent>
                        <Progress value={data.score} />
                        <p className="text-xs text-muted-foreground mt-4">
                          {data.rationale}
                        </p>
                      </CardContent>
                    </Card>
                    // <Card
                    //   key={category}
                    //   className="bg-black/50 border border-purple-500/20"
                    // >
                    //   <CardHeader className="p-3 md:p-4">
                    //     <CardTitle className="capitalize text-sm text-purple-400">
                    //       {category}
                    //     </CardTitle>
                    //   </CardHeader>
                    //   <CardContent className="p-3 md:p-4 pt-0">
                    //     <Progress
                    //       value={data.score}
                    //       className="mb-2 h-2.5 bg-gradient-to-r from-purple-900/30 to-purple-700/30 rounded-lg overflow-hidden"
                    //       indicatorClassName="bg-gradient-to-r from-purple-500 to-purple-300 transition-all duration-500 ease-in-out shadow-[0_0_8px_rgba(168,85,247,0.3)]"
                    //     />
                    //     <p className="text-lg md:text-xl font-bold text-[#F5EEEE]">
                    //       {data.score}
                    //     </p>
                    //     <div
                    //       className="mt-2 text-xs md:text-sm text-[#F5EEEE]/60 hover:text-[#F5EEEE]/80 transition-all duration-200 cursor-pointer"
                    //       onClick={(e) => {
                    //         const target = e.currentTarget;
                    //         const isExpanded =
                    //           target.classList.contains("expanded");
                    //         if (isExpanded) {
                    //           target.textContent =
                    //             data.rationale.substring(0, 60) + "...";
                    //           target.classList.remove("expanded");
                    //         } else {
                    //           target.textContent = data.rationale;
                    //           target.classList.add("expanded");
                    //         }
                    //       }}
                    //     >
                    //       {data.rationale.substring(0, 60)}...
                    //     </div>
                    //   </CardContent>
                    // </Card>
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
import { toast } from "sonner";
import { Sidebar } from "./components/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(relativeTime);
dayjs.extend(isToday);

export default function PlaygroundPage() {
  const { data: { data: getVirtual } = {} } = useQuery({
    queryKey: ["getVirtual"],
    queryFn: API.getVirtual,
  });

  const methods = useForm({
    mode: "onChange",
    values: {
      customFunctions: [],
      name: getVirtual?.name || "",
      description: getVirtual?.game?.description || "",
      functions: getVirtual?.game?.functions || [],
      goal: getVirtual?.game?.goal || "",
      worldInfo: getVirtual?.game?.worldInfo || "",
    },
  });
  const { isSidebarOpen, openSidebar, closeSidebar, toggleSidebar } =
    useSidebar();

  const [showEvaluationDialog, hideEvaluationDialog] = useEvaluationDialog();

  const reactTwitter = useMutation({
    mutationKey: ["reactTwitter"],
    mutationFn: API.reactTwitter,
    // onSuccess: (data) => {
    //   const end = Date.now() + 3 * 1000; // 3 seconds
    //   const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    //   const frame = () => {
    //     if (Date.now() > end) return;

    //     confetti({
    //       particleCount: 2,
    //       angle: 60,
    //       spread: 55,
    //       startVelocity: 60,
    //       origin: { x: 0, y: 0.5 },
    //       colors: colors,
    //     });
    //     confetti({
    //       particleCount: 2,
    //       angle: 120,
    //       spread: 55,
    //       startVelocity: 60,
    //       origin: { x: 1, y: 0.5 },
    //       colors: colors,
    //     });

    //     requestAnimationFrame(frame);
    //   };

    //   frame();
    //   showEvaluationDialog({ result: data });
    // },
    onError: (error) => {
      console.error(error);
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

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => {
            reactTwitter.mutate({
              data: {
                ...values,
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
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/playground/virtuals">
                      <Button size="icon" variant="ghost" type="button">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>New</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
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
                      <Evaluate />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex w-full h-full p-2 space-x-2 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-y-hidden">
                    <Panels />
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
