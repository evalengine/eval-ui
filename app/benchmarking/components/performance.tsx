"use client";

import { useModels } from "@/api/benchmark/queries/use-models";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";

import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  DataZoomComponent,
} from "echarts/components";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import { LineChart, BarChart, ScatterChart, RadarChart } from "echarts/charts";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

echarts.use([
  RadarChart,
  ScatterChart,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
  DataZoomComponent,
  GridComponent,
  SVGRenderer,
  CanvasRenderer,
  LegendComponent,
]);

import { jsPDF } from "jspdf";
import "svg2pdf.js";
import { downloadCSV } from "@/lib/download-csv";
import { METRICS_DESCRIPTION } from "@/lib/constant";

export function PerformanceAnalysis() {
  const { data: { models } = {}, isLoading, isFetching } = useModels();

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
  } = useForm({
    values: {
      model: Object.keys(models || {})[0],
    },
  });

  const model = watch("model");

  const [instance, setInstance] = useState<echarts.ECharts>();

  return (
    <main className="grid gap-4 md:grid-cols-1">
      <div className="flex flex-row justify-center space-x-4">
        <Controller
          control={control}
          name="model"
          defaultValue=""
          render={({ field, fieldState }) => {
            return <ModelComboxbox {...field} />;
          }}
        />
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                const dataURL = instance!.getDataURL({ type: "jpeg" });
                const a = document.createElement("a");
                a.download = `${model}-performance-analysis.jpeg`;
                a.href = dataURL;
                a.click();
              }}
              variant="outline"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export Image</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              onClick={async () => {
                const dataURL = instance!.getDataURL({
                  type: "jpeg",
                  pixelRatio: 2,
                });

                const doc = new jsPDF({
                  orientation: "landscape",
                  unit: "px",
                  format: [instance!.getWidth(), instance!.getHeight()],
                });

                // const element = document.getElementById('svg')
                doc.addImage(
                  dataURL,
                  "JPEG",
                  0,
                  0,
                  instance!.getWidth(),
                  instance!.getHeight()
                );
                doc.save(`${model}-performance-analysis.pdf`);
              }}
              variant="outline"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export PDF</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                downloadCSV({
                  filename: `${model}-performance-analysis.csv`,
                  data: Object.keys(models![model].category_performance).map(
                    (key) => {
                      return {
                        category: key,
                        performance: models![model].category_performance[key],
                      };
                    }
                  ),
                });
              }}
              variant="outline"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Export CSV</TooltipContent>
        </Tooltip>
      </div>

      {model && (
        <div className="grid gap-4 md:grid-cols-1">
          <Card key={model} className="w-full">
            {/* <CardHeader className="items-center">
              <CardTitle>Performance Analysis for {model}</CardTitle>
              <CardDescription>
                Analyze the performance of your model over time
              </CardDescription>
            </CardHeader> */}

            <CardContent className="pb-0 grid grid-cols-1 p-6 space-y-2">
              <div
                className="w-full overflow-x-hidden rounded-lg"
                style={{ height: "30rem" }}
                ref={(ref) => {
                  if (ref) {
                    const instance = echarts.init(ref, "dark", {
                      renderer: "canvas",
                    });
                    setInstance(instance);
                    if (isLoading || isFetching) {
                      instance.showLoading();
                    } else {
                      instance.hideLoading();
                      instance.resize();
                    }

                    const options = {
                      backgroundColor: "transparent",
                      title: {
                        text: `Performance Analysis for ${model}`,
                        // subtext:
                        //   "Analyze the performance of your model over time",
                        left: "center",
                        top: 20,
                        textStyle: {
                          color: "#fff",
                          fontSize: 24,
                        },
                      },
                      tooltip: {
                        trigger: "item",
                        axisPointer: {
                          // Use axis to trigger tooltip
                          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                        },
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        borderColor: "#333",
                        textStyle: {
                          color: "#fff",
                        },
                      },
                      grid: {
                        containLabel: true,
                        top: 100,
                        bottom: 55,
                        left: 25,
                        right: "5%",
                      },
                      radar: [
                        {
                          indicator: Object.keys(
                            models![model].category_performance || {}
                          ).map((key) => {
                            return {
                              text: key?.replaceAll("_", " ")?.toUpperCase(),
                              max: 100,
                            };
                          }),
                          // center: ["75%", "50%"],
                          radius: 120,
                          axisName: {
                            color: "#fff",
                            // backgroundColor: "#666",
                            borderRadius: 3,
                            padding: [3, 5],
                          },
                        },
                      ],
                      series: [
                        {
                          type: "radar",
                          emphasis: {
                            lineStyle: {
                              width: 4,
                            },
                          },
                          data: [
                            {
                              value: Object.keys(
                                models![model].category_performance || {}
                              ).map((key) => {
                                return parseFloat(
                                  (
                                    models![model]?.category_performance[key] *
                                    100
                                  ).toFixed(2)
                                );
                              }),
                              name: `${model} Performance`,
                              symbol: "rect",
                              symbolSize: 12,
                              lineStyle: {
                                // type: "dashed",
                                type: "solid",
                              },
                              label: {
                                show: true,
                                formatter: function (params) {
                                  return params.value.toFixed(2);
                                },
                              },
                              areaStyle: {
                                color: new echarts.graphic.RadialGradient(
                                  0.1,
                                  0.6,
                                  1,
                                  [
                                    {
                                      color: "rgba(0, 0, 124, 0.1)",
                                      offset: 0,
                                    },
                                    {
                                      color: "rgba(0, 0, 124, 0.9)",
                                      offset: 1,
                                    },
                                  ]
                                ),
                              },
                            },
                          ],
                        },
                      ],
                    };
                    setTimeout(() => {
                      instance.setOption(options);
                    });
                    new ResizeObserver(() => {
                      instance.resize();
                    }).observe(ref);
                    window.addEventListener("resize", function () {
                      instance.resize();
                    });
                  }
                }}
              />
              <div className="text-xs text-zinc-500 dark:text-zinc-400 grid grid-cols-1 gap-5">
                {Object.keys(METRICS_DESCRIPTION).map((key) => {
                  return (
                    <div className="grid grid-cols-2 gap-2" key={key}>
                      <span>{key}</span>
                      <span>{METRICS_DESCRIPTION[key]}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
            {/* <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 font-medium leading-none">
                <TrendingUp size={16} />
                <span>Performance is improving</span>
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                <span>Updated 2 days ago</span>
                <span>•</span>
                <span>View details</span>
              </div>
            </CardFooter> */}
          </Card>
        </div>
      )}
    </main>
  );
}

function ModelComboxbox({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const { data: { models } = {} } = useModels();

  const options = Object.keys(models || {}).map((model) => {
    return {
      value: model,
      label: model,
    };
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? options.find((o) => o.value === value)?.label
            : "Select model..."}
          <ChevronsUpDown className="opacity-50 w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search model..." className="h-9" />
          <CommandList>
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <HoverCard key={o.value} openDelay={0} closeDelay={0}>
                  <HoverCardTrigger>
                    <CommandItem
                      key={o.value}
                      value={o.value}
                      onSelect={(currentValue) => {
                        onChange(currentValue);
                        setOpen(false);
                      }}
                    >
                      {o.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === o.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  </HoverCardTrigger>
                  <HoverCardContent side="right" align="start">
                    <div className="p-1 text-sm bg-white dark:bg-black rounded-t-lg mb-4">
                      <div className="flex items-center">
                        <div className="space-x-1">
                          <span className="font-medium text-zinc-900 dark:text-zinc-100">
                            {o.label}
                          </span>
                        </div>
                      </div>
                      {/* <div className="mt-4 text-xs text-zinc-500 dark:text-zinc-400"></div> */}
                    </div>
                    <Separator />
                    <div className="p-1 text-xs bg-white dark:bg-black divide-y">
                      <div className="flex items-start py-3 text-[.5rem]">
                        <div className="w-24 text-xs font-medium dark:text-zinc-400">
                          Total
                        </div>
                        <div className="flex-1 text-xs text-zinc-200 dark:text-zinc-100">
                          $ {models![o.value].costs.total}
                        </div>
                      </div>
                      <div className="flex items-start py-3 text-[.5rem]">
                        <div className="w-24 text-xs font-medium dark:text-zinc-400">
                          Input Pricing
                        </div>
                        <div className="flex-1 text-xs text-zinc-200 dark:text-zinc-100">
                          $ {models![o.value].costs.input}
                          {/* / million tokens */}
                        </div>
                      </div>
                      <div className="flex items-start py-3 text-[.5rem]">
                        <div className="w-24 text-xs font-medium dark:text-zinc-400">
                          Output Pricing
                        </div>
                        <div className="flex-1 text-xs text-zinc-200 dark:text-zinc-100">
                          $ {models![o.value].costs.output}
                          {/* / million tokens */}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
