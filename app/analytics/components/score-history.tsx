"use client";

import dayjs from "dayjs";

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
import { LineChart, BarChart } from "echarts/charts";

echarts.use([
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

export function ScoreHistory({ data = [] }: { data: any }) {
  // Filter completed evaluations and sort by created_at
  const completedEvals = data
    .filter((d: any) => d.evaluation_status === "completed")
    .sort((a: any, b: any) => a.created_at - b.created_at);

  return (
    <>
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
                top: 25,
                bottom: 55,
                left: 25,
                right: "5%",
              },
              xAxis: [
                {
                  type: "time",
                  show: true,
                  // max: function (value: any) {
                  //   return value.max + 3600 * 1000 * 24;
                  // },
                  boundaryGap: true,
                  axisTick: {
                    alignWithLabel: true,
                  },
                  axisLine: {
                    onZero: true,
                  },
                  // splitNumber: dayjs().daysInMonth(),
                  splitLine: {
                    show: false,
                  },
                  axisLabel: {
                    formatter: function (value: any) {
                      return [
                        `{a|${dayjs(value).format("MMM")}}`,
                        `{b|${echarts.format.formatTime("dd", value)}}`,
                      ].join("\n");
                      // echarts.format.formatTime("dd", value)
                      // And other formatter tool (e.g. moment) can be used here.
                    },
                  },
                  minInterval: 3600 * 1000 * 24,
                  maxInterval: "auto",
                },
              ],
              yAxis: {
                type: "value",
                max: 100,
                min: 0,
              },
              series: [
                {
                  name: "Average of Score",
                  data: completedEvals.map((d: any) => [
                    d.created_at,
                    parseFloat(d.final_score),
                  ]),
                  type: "line",
                  animation: true,
                  // showSymbol: false,
                  // smooth: false,
                  // smoothMonotone: "x",
                  // xAxisIndex: 0,
                  emphasis: {
                    focus: "series",
                  },
                  color: "#fff",
                  lineStyle: {
                    // color: "hsl(var(--primary))",
                    // width: 4,
                    // type: "solid",
                  },
                },
              ],
              dataZoom: [
                {
                  type: "slider",
                  show: true,
                  xAxisIndex: 0,
                  fillerColor: "rgba(233,233,233, 0.1)",
                  backgroundColor: "rgba(233,233,233, 0.1)",
                  dataBackground: {
                    lineStyle: {
                      color: "#fff",
                      width: 0,
                      cap: "round",
                    },
                    areaStyle: {
                      color: "#fff",
                    },
                  },
                  zoomLock: false,
                  textStyle: {
                    color: "rgba(255, 255, 255, 1)",
                  },
                  brushSelect: false,
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
    </>
  );
}
