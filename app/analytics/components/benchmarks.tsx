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
import { useRef, useState } from "react";

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
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
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
  CanvasRenderer,
  LegendComponent,
]);

import { jsPDF } from "jspdf";
import "svg2pdf.js";
import Papa from "papaparse";

export const downloadCSV = (args) => {
  let filename = args.filename || "export.csv";

  let csv = Papa.unparse(args.data);
  if (csv == null) return;

  var blob = new Blob([csv]);

  var a = window.document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
  document.body.removeChild(a);
};

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

  const [instance, setInstance] = useState<echarts.ECharts>();
  const ref = useRef(null);

  return (
    <main className="grid gap-4 md:grid-cols-1">
      <div className="flex flex-row justify-center space-x-4">
        <Button
          onClick={() => {
            const dataURL = instance!.getDataURL({ type: "jpeg" });
            const a = document.createElement("a");
            a.download = `model-speed-vs-performance.jpeg`;
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
            doc.save("model-speed-vs-performance.pdf");
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
        <Button
          onClick={() => {
            downloadCSV({
              filename: "model-speed-vs-performance.csv",
              data: Object.keys(models || {}).map((model) => {
                return {
                  model,
                  speed: models![model].speed.tokens_per_second,
                  performance: models![model].overall_performance.score,
                };
              }),
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
      </div>

      <div
        id="model-speed-vs-performance-chart"
        className="grid gap-4 md:grid-cols-1"
      >
        <Card className="w-full">
          {/* <CardHeader className="items-center">
            <CardTitle>Model Speed vs Performance</CardTitle>
            <CardDescription>
              Analyze the speed and performance of your models
            </CardDescription>
          </CardHeader> */}
          <CardContent className="pb-0">
            <div
              className="w-full overflow-x-hidden rounded-lg"
              style={{ height: "30rem" }}
              ref={(ref) => {
                if (ref) {
                  const instance = echarts.init(ref, "dark", {
                    renderer: "canvas",
                  });
                  setInstance(instance);

                  instance.hideLoading();
                  instance.resize();

                  const options = {
                    backgroundColor: "transparent",
                    title: {
                      text: "Model Speed vs Performance",
                      subtext:
                        "Analyze the speed and performance of your models",
                      left: "center",
                      top: 20,
                      textStyle: {
                        color: "#fff",
                        fontSize: 24,
                      },
                    },
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
                            <div>Performance (Score): ${value[1].toFixed(
                              2
                            )}</div>
                          </div>
                        </div>
                      `;
                      },
                    },
                    grid: {
                      containLabel: true,
                      top: 100,
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
      </div>
    </main>
  );
}

export function PerformanceAnalysis() {
  const { data: { models } = {} } = useModels();
  const { data: stats } = useStats();
  const { data: comparison } = useComparison();
  const { data: _model } = useModel({
    model_name: Object.keys(models || {})[0],
  });

  console.log({ models, stats, comparison, _model });
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
            <CardContent className="pb-0">
              <div
                className="w-full overflow-x-hidden rounded-lg"
                style={{ height: "30rem" }}
                ref={(ref) => {
                  if (ref) {
                    const instance = echarts.init(ref, "dark", {
                      renderer: "canvas",
                    });
                    setInstance(instance);

                    instance.hideLoading();
                    instance.resize();

                    const options = {
                      backgroundColor: "transparent",
                      title: {
                        text: `Performance Analysis for ${model}`,
                        subtext:
                          "Analyze the performance of your model over time",
                        left: "center",
                        top: 20,
                        textStyle: {
                          color: "#fff",
                          fontSize: 24,
                        },
                      },
                      tooltip: {
                        trigger: "axis",
                        axisPointer: {
                          // Use axis to trigger tooltip
                          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
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
