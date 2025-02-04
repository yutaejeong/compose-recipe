"use client";

import { HourlyData } from "@/app/commercial-status/actions";
import { Typography } from "@mui/material";
import { BarPlot, ChartsXAxis, ChartsYAxis, LinePlot, MarkPlot, ResponsiveChartContainer } from "@mui/x-charts";
import { use } from "react";

interface Props {
  commercialStatusPromise: Promise<HourlyData[]>;
}

export default function CommercialStatusChart({ commercialStatusPromise }: Props) {
  const last24HoursData = use(commercialStatusPromise);

  if (last24HoursData.reduce<boolean>((acc, item) => item.avgAmtSum === 0 && acc, true)) {
    return <Typography variant="h6">상권 활성도 데이터를 불러오지 못 했습니다 🫤</Typography>;
  }

  return (
    <ResponsiveChartContainer
      series={[
        {
          type: "line",
          dataKey: "avgAmtSum",
          yAxisId: "amount",
          color: "#777",
          showMark: false,
        },
        {
          type: "bar",
          dataKey: "cmrclLvl",
          yAxisId: "congestion",
        },
      ]}
      xAxis={[
        {
          dataKey: "hour",
          scaleType: "band",
          valueFormatter: (value) => value.substring(8) + "시",
          id: "hours",
        },
      ]}
      yAxis={[
        { valueFormatter: (value) => `${parseInt(value) / 10000}만원`, id: "amount" },
        {
          min: 0,
          max: 4,
          valueFormatter: (value) => {
            switch (value) {
              case 1:
                return "한산함";
              case 2:
                return "보통";
              case 3:
                return "바쁨";
              case 4:
                return "분주함";
              default:
                return "";
            }
          },
          colorMap: {
            type: "piecewise",
            thresholds: [2, 3, 4],
            colors: ["#CDFAD5", "#F6FDC3", "#FFCF96", "#FF8080"],
          },
          id: "congestion",
        },
      ]}
      dataset={last24HoursData.map((item) => ({ ...item }))}
    >
      <BarPlot />
      <LinePlot />
      <MarkPlot />
      <ChartsXAxis position="bottom" axisId="hours" />
      <ChartsYAxis position="left" axisId="amount" />
      <ChartsYAxis position="right" axisId="congestion" />
    </ResponsiveChartContainer>
  );
}
