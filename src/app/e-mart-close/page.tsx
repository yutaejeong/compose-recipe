import Link from "next/link";
import { getEMartClose } from "./actions";
import Calendar from "./Calendar";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { getDaysUntilNextClose } from "./getDaysUntilNextClose";

export default async function EMartClosePage() {
  const eMartClose = await getEMartClose();
  const today = new Date();

  const isTodayClose = eMartClose.some(
    (date) =>
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear(),
  );

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-2 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Button variant="contained" className="mb-2">
          메인 페이지로
        </Button>
      </Link>
      <div className="flex items-center justify-items-center gap-2">
        <Image src="/images/e_mart_logo.svg" width={94} height={30} alt="e-mart-logo" />
        <Typography variant="h5">휴무일</Typography>
      </div>
      <Typography variant="h6" color={isTodayClose ? "error" : "primary"}>
        {isTodayClose ? "오늘은 휴무일입니다." : `다음 휴무일까지 ${getDaysUntilNextClose(eMartClose)}일 남았습니다.`}
      </Typography>
      <Calendar eMartClose={eMartClose} />
    </div>
  );
}
