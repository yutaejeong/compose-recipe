"use client";

import { Schedule } from "@/app/cgv-schedules/actions";
import { Card, CardContent, CardMedia, Chip, Divider, Typography } from "@mui/material";
import { Fragment, use } from "react";

interface Props {
  schedulesPromise: Promise<Schedule[]>;
}

export default function ScheduleList({ schedulesPromise }: Props) {
  const schedules = use(schedulesPromise);

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
              {schedule.startTime.substring(0, 2)}:{schedule.startTime.substring(2)}
            </strong>{" "}
            ~ {schedule.endTime.substring(0, 2)}:{schedule.endTime.substring(2)}
          </Typography>
          <Typography variant="subtitle1">
            <strong>{schedule.bookedSeats}석</strong> 예매됨
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  ));
}
