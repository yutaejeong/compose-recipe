import CommercialStatusChart from "@/components/commercial-status/CommercialStatusChart";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";
import { getCityData, getCommercialStatus } from "./action";
import CurrentPaymentLevel from "@/components/commercial-status/CurrentPaymentLevel";

export default function CommercialStatusPage() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Button variant="contained">메인 페이지로</Button>
      </Link>
      <Suspense fallback={<CircularProgress size="3rem" />}>
        <CurrentPaymentLevel currentPaymentLevelPromise={getCityData()} />
        <CommercialStatusChart commercialStatusPromise={getCommercialStatus().then((data) => data.list24Hour)} />
      </Suspense>
    </div>
  );
}
