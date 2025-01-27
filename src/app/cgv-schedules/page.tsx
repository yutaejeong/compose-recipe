"use client";

import { Card, CardContent, CardMedia, Chip, CircularProgress, Divider, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { getCgvSchedules, Schedule } from "./actions";

export default function CgvSchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCgvSchedules().then((data) => {
      setSchedules(
        data.filter((schedule) => !!schedule.startTime).sort((a, b) => parseInt(a.endTime) - parseInt(b.endTime)),
      );
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {loading && <CircularProgress size="3rem" />}
      {schedules.map((schedule, i) => (
        <Fragment key={`${schedule.title}-${i}`}>
          {(() => {
            if (i == 0) {
              return (
                <Divider sx={{ width: "100%", maxWidth: "1000px" }}>
                  <Chip label={`${schedule.endTime.substring(0, 2)}:00`} size="medium" />
                </Divider>
              );
            }
            if (schedules[i - 1].endTime.substring(0, 2) !== schedule.endTime.substring(0, 2)) {
              return (
                <Divider sx={{ width: "100%", maxWidth: "1000px" }}>
                  <Chip label={`${schedule.endTime.substring(0, 2)}:00`} size="medium" />
                </Divider>
              );
            }
            return null;
          })()}
          <Card sx={{ width: "100%", maxWidth: "1000px", display: "flex" }}>
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
                <strong>
                  {schedule.endTime.substring(0, 2)}:{schedule.endTime.substring(2)}
                </strong>
              </Typography>
              <Typography variant="subtitle1">
                <strong>{schedule.bookedSeats}석</strong> 예매됨
              </Typography>
            </CardContent>
          </Card>
        </Fragment>
      ))}
    </div>
  );
}
