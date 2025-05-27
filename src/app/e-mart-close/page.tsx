import { Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getEMartClose } from "./actions";
import Calendar from "./Calendar";
import DDayToNextClose from "./DDayToNextClose";

export default async function EMartClosePage() {
  const eMartClose = await getEMartClose();

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
      <DDayToNextClose eMartClose={eMartClose} />
      <Calendar eMartClose={eMartClose} />
    </div>
  );
}
