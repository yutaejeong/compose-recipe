"use server";

import Base64 from "crypto-js/enc-base64";
import HmacSHA256 from "crypto-js/hmac-sha256";
import { ApiResponse, Schedule } from "./types";

function generateSignature(path: string, body = "") {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const secretKey = "ydqXY0ocnFLmJGHr_zNzFcpjwAsXq_8JcBNURAkRscg";
  const source = `${timestamp}|${path}|${body}`;
  const signature = HmacSHA256(source, secretKey).toString(Base64);

  return {
    "X-TIMESTAMP": timestamp,
    "X-SIGNATURE": signature,
  };
}

export async function getCgvSchedules() {
  const path = "/cnm/atkt/searchMovScnInfo";
  const response = await fetch(
    `https://api-mobile.cgv.co.kr${path}?coCd=A420&siteNo=0074&scnYmd=20250720&rtctlScopCd=08`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Accept-Language": "ko-KR",
        ...generateSignature(path),
      },
    },
  );

  const data = await response.json() as ApiResponse;

  // 영화별 스케줄 추출
  const schedules: Schedule[] = data.data.map((s) => ({
    title: s.movNm,
    poster_url: `https://img.cgv.co.kr/Movie/Thumbnail/Poster/${s.physcFilePathnm}`,
    hallType: s.expoScnsNm,
    startTime: `${s.scnsrtTm.slice(0, 2)}:${s.scnsrtTm.slice(2)}`,
    endTime: `${s.scnendTm.slice(0, 2)}:${s.scnendTm.slice(2)}`,
    totalSeats: Number(s.stcnt),
    remainingSeats: Number(s.frSeatCnt),
    bookedSeats: Number(s.stcnt) - Number(s.frSeatCnt),
  }));

  return schedules
    .filter((schedule) => !!schedule.startTime)
    .sort((a, b) => parseInt(a.startTime) - parseInt(b.startTime));
}
