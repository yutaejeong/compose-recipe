"use client";

import { Schedule } from "@/app/cgv-schedules/types";
import { Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Fragment, use } from "react";

interface Props {
  schedulesPromise: Promise<Schedule[]>;
}

export default function ScheduleList({ schedulesPromise }: Props) {
  const schedules = use(schedulesPromise);

  if (schedules.length === 0) {
    return <Typography variant="h6">오늘의 상영 스케줄이 더 이상 없습니다 😎</Typography>;
  }

  return schedules.map((schedule, i) => (
    <Fragment key={`${schedule.title}-${i}`}>
      {(() => {
        if (i == 0) {
          return (
            <Divider sx={{ width: "100%", maxWidth: "1000px" }}>
              <Chip label={`${schedule.startTime.substring(0, 2)}:00`} size="medium" />
            </Divider>
          );
        }
        if (schedules[i - 1].startTime.substring(0, 2) !== schedule.startTime.substring(0, 2)) {
          return (
            <Divider sx={{ width: "100%", maxWidth: "1000px" }}>
              <Chip label={`${schedule.startTime.substring(0, 2)}:00`} size="medium" />
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
            <strong>
              {schedule.startTime}
            </strong>{" "}
            ~ {schedule.endTime}
          </Typography>
          <Typography variant="subtitle1">
            <strong>{schedule.bookedSeats}석</strong> 예매됨
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  ));
}
