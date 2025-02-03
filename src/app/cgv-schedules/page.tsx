import ScheduleList from "@/components/cgv-schedules/ScheduleList";
import { Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";
import { getCgvSchedules } from "./actions";

export default function CgvSchedulePage() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Button variant="contained">메인 페이지로</Button>
      </Link>
      <Suspense fallback={<CircularProgress size="3rem" />}>
        <ScheduleList schedulesPromise={getCgvSchedules()} />
      </Suspense>
    </div>
  );
}
