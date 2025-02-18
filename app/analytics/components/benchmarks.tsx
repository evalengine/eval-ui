"use client";

import { useModel } from "@/api/benchmark/queries/use-model";
import { useModels } from "@/api/benchmark/queries/use-models";
import { useStats } from "@/api/benchmark/queries/use-stats";
import { useComparison } from "@/api/benchmark/queries/use-comparison";

import { TrendingUp } from "lucide-react";
// import { PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts";

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

import dynamic from "next/dynamic";
const ReactApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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
import { SVGRenderer } from "echarts/renderers";
import { LineChart, BarChart, ScatterChart, RadarChart } from "echarts/charts";
import dayjs from "dayjs";

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
  LegendComponent,
]);

export function ModelSpeedVSPerformance() {
  // Compute linear regression (simple example)
  function linearRegression(data) {
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXX = 0,
      n = data.length;

    for (let i = 0; i < n; i++) {
      let x = data[i][0],
        y = data[i][1];
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumXX += x * x;
    }

    let slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    let intercept = (sumY - slope * sumX) / n;

    let minX = Math.min(...data.map((d) => d[0]));
    let maxX = Math.max(...data.map((d) => d[0]));

    return [
      [minX, slope * minX + intercept],
      [maxX, slope * maxX + intercept],
    ];
  }

  const { data: { models } = {} } = useModels();

  const scatterData = Object.keys(models || {}).map((model) => {
    return [
      models![model].speed.tokens_per_second,
      models![model].overall_performance.score,
      model,
    ];
  });
  const trendline = linearRegression(scatterData);

  return (
    <main className="grid gap-4 md:grid-cols-1">
      <Card className="w-full">
        <CardHeader className="items-center">
          <CardTitle>Model Speed vs Performance</CardTitle>
          <CardDescription>
            Analyze the speed and performance of your models
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <div
            className="w-full overflow-x-hidden rounded-lg"
            style={{ height: "25rem" }}
            ref={(ref) => {
              if (ref) {
                const instance = echarts.init(ref, "dark");

                instance.hideLoading();
                instance.resize();

                const options = {
                  backgroundColor: "transparent",
                  tooltip: {
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderColor: "#333",
                    textStyle: {
                      color: "#fff",
                    },
                    trigger: "axis",
                    axisPointer: {
                      // Use axis to trigger tooltip
                      type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                    },
                    formatter: function (params) {
                      const { name, value } = params[0];
                      return `
                        <div class="p-0">
                          <div class="font-medium mb-2">${name}</div>
                          <div class="text-xs">
                            <div>Speed (tokens per second): ${value[0]}</div>
                            <div>Performance (Score): ${value[1].toFixed(2)}</div>
                          </div>
                        </div>
                      `;
                    },
                  },
                  grid: {
                    containLabel: true,
                    top: 5,
                    bottom: 55,
                    left: 25,
                    right: "5%",
                  },
                  xAxis: {
                    name: "Speed (tokens per second)",
                    nameLocation: "middle",
                    nameGap: 35,
                    axisLine: {
                      lineStyle: {
                        color: "#ffffff44",
                      },
                    },
                    // splitLine: {
                    //   show: false,
                    // },
                  },
                  yAxis: {
                    name: "Performance (score)",
                    nameLocation: "middle",
                    nameGap: 35,
                    axisLine: {
                      lineStyle: {
                        color: "#ffffff44",
                      },
                    },
                    // splitLine: {
                    //   show: false,
                    // },
                  },
                  series: [
                    {
                      type: "line",
                      showSymbol: false,
                      data: trendline,
                      lineStyle: {
                        type: "dashed",
                        color: "red",
                      },
                      color: "red",
                    },
                    {
                      // symbolSize: 20,
                      // symbolOffset: [-100, -20],
                      // color: "hsl(var(--chart-1))",
                      color: "#fff",
                      data: Object.keys(models || {}).map((model) => {
                        return {
                          value: [
                            models![model].speed.tokens_per_second,
                            models![model].overall_performance.score,
                          ],
                          name: model,
                        };
                      }),
                      label: {
                        show: true,
                        position: "right",
                        formatter: (params) => params.name,
                        // color: "#fff",
                        // fontSize: 16,
                      },
                      labelLayout: { hideOverlap: true, dy: -10 },
                      type: "scatter",
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
    </main>
  );
}

export function PerformanceAnalysis() {
  const { data: { models } = {} } = useModels();
  // console.log(models!["deepseek-r1"]);
  // const { data: stats } = useStats();
  // const { data: comparison } = useComparison();
  // const { data: model } = useModel({ model_name: "model-1" });
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
    }
  });

  const model = watch("model");

  return (
    <main className="grid gap-4 md:grid-cols-1">
      <Controller
        control={control}
        name="model"
        defaultValue=""
        render={({ field, fieldState }) => {
          return <ModelComboxbox {...field} />;
        }}
      />
      {model && (
        <div className="grid gap-4 md:grid-cols-1">
          <Card key={model} className="w-full">
            <CardHeader className="items-center">
              <CardTitle>Performance Analysis for {model}</CardTitle>
              <CardDescription>
                Analyze the performance of your model over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
              <div
                className="w-full overflow-x-hidden rounded-lg"
                style={{ height: "25rem" }}
                ref={(ref) => {
                  if (ref) {
                    const instance = echarts.init(ref, "dark");

                    instance.hideLoading();
                    instance.resize();

                    const options = {
                      backgroundColor: "transparent",
                      tooltip: {
                        trigger: "axis",
                        axisPointer: {
                          // Use axis to trigger tooltip
                          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
                        },
                      },
                      grid: {
                        containLabel: true,
                        top: 0,
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
                            backgroundColor: "#666",
                            borderRadius: 3,
                            padding: [3, 5],
                          },
                        },
                      ],
                      series: [
                        {
                          type: "radar",
                          data: [
                            {
                              value: Object.keys(
                                models![model].category_performance || {}
                              ).map(
                                (key) =>
                                  models![model]?.category_performance[key] *
                                  100
                              ),
                              name: "Performance",
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

export function Benchmarks() {
  return (
    <div className="grid gap-4 md:grid-cols-1">
      <PerformanceAnalysis />
      <ModelSpeedVSPerformance />
    </div>
  );
}
