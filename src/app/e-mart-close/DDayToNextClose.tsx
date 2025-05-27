"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  eMartClose: Date[];
}

export default function DDayToNextClose({ eMartClose }: Props) {
  const [isTodayClose, setIsTodayClose] = useState(false);
  const [daysUntilNextClose, setDaysUntilNextClose] = useState<number | null>(null);
  const [nextCloseDate, setNextCloseDate] = useState<Date | null>(null);

  useEffect(() => {
    const today = new Date();
    const nextCloseDate = eMartClose.filter((date) => date > today).sort((a, b) => a.getTime() - b.getTime())[0];
    setIsTodayClose(
      today.getDate() === nextCloseDate?.getDate() &&
        today.getMonth() === nextCloseDate?.getMonth() &&
        today.getFullYear() === nextCloseDate?.getFullYear(),
    );
    setDaysUntilNextClose(
      nextCloseDate ? Math.ceil((nextCloseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : null,
    );
    setNextCloseDate(nextCloseDate);
  }, [eMartClose]);

  return (
    <Typography variant="h6" color={isTodayClose ? "error" : "primary"}>
      {isTodayClose ? "오늘은 휴무일입니다." : `다음 휴무일까지 ${daysUntilNextClose}일 남았습니다.`}
    </Typography>
  );
}
