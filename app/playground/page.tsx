"use client";
import { Metadata } from "next";
import Image from "next/image";
import { RotateCcw, Plus, History } from "lucide-react";

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
import { CTweet, Panels } from "./components/c-tweet";
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
import { useEffect } from "react";

// export const metadata: Metadata = {
//   title: "Playground",
//   description: "The OpenAI Playground built using the components.",
// };

import API from "@/api";
import { useMutation } from "@tanstack/react-query";
import confetti from "canvas-confetti";

export const useEvaluationDialog = () => {
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    control,
    register,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" });

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

export default function PlaygroundPage() {
  const methods = useForm();

  const [showEvaluationDialog, hideEvaluationDialog] = useEvaluationDialog();

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
      console.error(error);
      toast.error(`Error evaluating reply: ${error.message}`);
    },
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((values) => {
            evaluateTweet.mutate({
              input_tweet: values.originalTweet,
              output_tweet: values.responseTweet,
            });
          })}
        >
          <div className="flex flex-col items-start justify-between space-y-2 px-6 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Evaluate Reply Tweet
            </h2>
            <div className="ml-auto flex w-full space-x-2 sm:justify-end">
              <APISettings />
              <Evaluate />
            </div>
          </div>
          <Separator />
          <div className="flex flex-row w-full">
            <div className="hidden z-30 sticky top-[57px] flex-shrink-0 border-r w-14 bg-background-100 px-4 md:flex flex-col items-center justify-between h-[calc(100dvh-128px)]">
              <aside className="flex flex-col gap-3 sticky top-[57px] py-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" type="button">
                        <Plus className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>New</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" type="button">
                        <History className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>History</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </aside>
            </div>
            <div className="w-full md:w-[calc(100dvw-56px)]">
              <div className="flex overflow-hidden h-[calc(100svh-128px)]">
                <div className="flex flex-col flex-1 h-full overflow-x-auto bg-background-100">
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
