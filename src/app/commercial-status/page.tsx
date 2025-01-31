"use client";

import { Button, CircularProgress } from "@mui/material";
import { axisClasses, BarChart, LineChart } from "@mui/x-charts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCommercialStatus, HourlyData } from "./action";

export default function CommercialStatusPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [last24HoursData, setLast24HoursData] = useState<HourlyData[]>([]);

  useEffect(() => {
    getCommercialStatus().then((data) => {
      setLast24HoursData(data.list24Hour);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Button variant="contained">메인 페이지로</Button>
      </Link>
      {loading && <CircularProgress size="3rem" />}
      <div className="w-full h-full flex flex-col gap-2">
        <LineChart
          sx={{
            ".MuiChartsAxis-label": {
              transform: "translate(-20, 0)",
            },
            [axisClasses.root]: {
              transform: "translate(70, 0)",
            },
          }}
          height={500}
          series={[{ dataKey: "avgAmtSum", area: true, color: "#CAEDFF", showMark: false }]}
          dataset={last24HoursData.map((item) => ({ ...item }))}
          xAxis={[{ scaleType: "band", dataKey: "hour", valueFormatter: (value) => value.substring(8) + "시" }]}
          yAxis={[{ label: "평균 결제 금액", valueFormatter: (value) => `${parseInt(value) / 10000}만원` }]}
          loading={loading}
        />
        <BarChart
          height={500}
          series={[{ dataKey: "cmrclLvl" }]}
          dataset={last24HoursData.map((item) => ({ ...item }))}
          xAxis={[{ scaleType: "band", dataKey: "hour", valueFormatter: (value) => value.substring(8) + "시" }]}
          yAxis={[
            {
              label: "혼잡도",
              min: 0,
              max: 4,
              valueFormatter: (value) => {
                switch (value) {
                  case 1:
                    return "한산한 시간대";
                  case 2:
                    return "보통 시간대";
                  case 3:
                    return "바쁜 시간대";
                  case 4:
                    return "분주한 시간대";
                  default:
                    return "";
                }
              },
              colorMap: {
                type: "piecewise",
                thresholds: [2, 3, 4],
                colors: ["#CDFAD5", "#F6FDC3", "#FFCF96", "#FF8080"],
              },
            },
          ]}
          loading={loading}
        />
      </div>
    </div>
  );
}
