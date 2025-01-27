"use client";

import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { getCgvSchedules, Schedule } from "./actions";
import { useEffect, useState } from "react";

export default function CgvSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    getCgvSchedules().then((data) => {
      setSchedules(
        data.filter((schedule) => !!schedule.startTime).sort((a, b) => parseInt(a.endTime) - parseInt(b.endTime)),
      );
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {schedules.map((schedule, i) => (
        <Card sx={{ width: "100%", maxWidth: "1000px", display: "flex" }} key={`${schedule.title}-${i}`}>
          <CardMedia component="img" sx={{ width: 130 }} image={schedule.poster_url} alt={schedule.title} />
          <CardContent sx={{ width: "calc(100% - 130px)" }}>
            <Typography
              variant="h6"
              sx={{
                wordBreak: "break-all",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "100%",
                overflow: "hidden",
              }}
            >
              {schedule.title}
            </Typography>
            <Typography variant="subtitle1">
              {schedule.startTime.substring(0, 2)}:{schedule.startTime.substring(2)} ~{" "}
              {schedule.endTime.substring(0, 2)}:{schedule.endTime.substring(2)}
            </Typography>
            <Typography variant="subtitle1">{schedule.bookedSeats}석 예매됨</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
