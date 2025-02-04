"use client";

import { CurrentStatus } from "@/app/commercial-status/actions";
import { Card, CardContent, Typography } from "@mui/material";
import { use } from "react";

interface Props {
  currentPaymentLevelPromise: Promise<CurrentStatus>;
}

export default function CurrentPaymentLevel({ currentPaymentLevelPromise }: Props) {
  const data = use(currentPaymentLevelPromise);

  if (!data.RSB_PAYMENT_LVL || !data.RSB_SH_PAYMENT_CNT) {
    return (
      <Card sx={{ width: "300px" }}>
        <CardContent>
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            <span className="inline-block rounded-full w-2 h-2 bg-red-600 animate-pulse mr-1" />
            실시간 활성도
          </Typography>
          <Typography variant="h5">정보없음</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ width: "300px" }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          <span className="inline-block rounded-full w-2 h-2 bg-green-600 animate-pulse mr-1" />
          실시간 활성도 (기준시각: {data.CMRCL_TIME.split(" ")[1].substring(0, 2)}:
          {data.CMRCL_TIME.split(" ")[1].substring(2)})
        </Typography>
        <Typography variant="h5">{data.RSB_PAYMENT_LVL}</Typography>
        <Typography>
          지난 10분 간 매출 <strong>{data.RSB_SH_PAYMENT_CNT}건</strong>
        </Typography>
      </CardContent>
    </Card>
  );
}
