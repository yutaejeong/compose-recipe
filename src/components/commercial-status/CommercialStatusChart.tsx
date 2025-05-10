"use client";

import { HourlyData } from "@/app/commercial-status/actions";
import { Typography } from "@mui/material";
import { use, useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Scale,
  CoreScaleOptions,
  Tick,
  LineController,
  BarController,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
);

interface Props {
  commercialStatusPromise: Promise<HourlyData[]>;
}

export default function CommercialStatusChart({ commercialStatusPromise }: Props) {
  const last24HoursData = use(commercialStatusPromise);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // 이전 차트 인스턴스가 있다면 제거
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = last24HoursData.map((item) => item.hour.substring(8) + "시");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            type: "line",
            label: "평균 결제금액",
            data: last24HoursData.map((item) => item.avgAmtSum),
            borderColor: "#6366F1",
            backgroundColor: "#6366F1",
            borderWidth: 2,
            tension: 0.4,
            yAxisID: "y",
          },
          {
            type: "bar",
            label: "혼잡도",
            data: last24HoursData.map((item) => item.cmrclLvl),
            backgroundColor: last24HoursData.map((item) => {
              switch (item.cmrclLvl) {
                case 1:
                  return "#86EFAC";
                case 2:
                  return "#FDE68A";
                case 3:
                  return "#FCA5A5";
                case 4:
                  return "#F87171";
                default:
                  return "#86EFAC";
              }
            }),
            borderRadius: 4,
            yAxisID: "y1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "평균 결제금액",
            },
            ticks: {
              callback: function (this: Scale<CoreScaleOptions>, tickValue: string | number) {
                const value = Number(tickValue);
                return `${value / 10000}만원`;
              },
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "혼잡도",
            },
            min: 0,
            max: 4.5,
            ticks: {
              callback: function (this: Scale<CoreScaleOptions>, tickValue: string | number) {
                const value = Number(tickValue);
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
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [last24HoursData]);

  if (last24HoursData.reduce<boolean>((acc, item) => item.avgAmtSum === 0 && acc, true)) {
    return <Typography variant="h6">상권 활성도 데이터를 불러오지 못 했습니다 🫤</Typography>;
  }

  return (
    <div className="relative w-full" style={{ height: "500px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}
