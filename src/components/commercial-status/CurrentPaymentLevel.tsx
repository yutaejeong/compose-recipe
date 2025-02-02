import { CurrentStatus } from "@/app/commercial-status/action";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { use } from "react";

interface Props {
  currentPaymentLevelPromise: Promise<CurrentStatus>;
}

export default function CurrentPaymentLevel({ currentPaymentLevelPromise }: Props) {
  const data = use(currentPaymentLevelPromise);

  return (
    <Card sx={{ width: "300px" }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          실시간 활성도 (기준시각: {data.CMRCL_TIME.split(" ")[1].substring(0, 2)}:
          {data.CMRCL_TIME.split(" ")[1].substring(2)})
        </Typography>
        <Typography variant="h5">{data.RSB_PAYMENT_LVL}</Typography>
        <Typography>결제 건수: {data.RSB_SH_PAYMENT_CNT}건</Typography>
      </CardContent>
    </Card>
  );
}
