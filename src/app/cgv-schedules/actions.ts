"use server";

import * as cheerio from "cheerio";
import { randomUUID } from "crypto";

// 영화 스케줄 타입 정의
export interface Schedule {
  title: string;
  poster_url: string;
  hallType: string;
  startTime: string;
  endTime: string;
  totalSeats: number;
  remainingSeats: number;
  bookedSeats: number;
}

function getKSTDateString() {
  const now = new Date();

  // UTC+9 (KST) 시간대 오프셋
  const utcOffset = 9 * 60 * 60 * 1000;

  // UTC 기준 시간 + 9시간
  const kstTime = new Date(now.getTime() + utcOffset);

  // yyyyMMdd 형식으로 변환
  const yyyy = kstTime.getUTCFullYear();
  const MM = String(kstTime.getUTCMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const dd = String(kstTime.getUTCDate()).padStart(2, "0");

  return `${yyyy}${MM}${dd}`;
}

export async function getCgvSchedules() {
  const headers = new Headers();
  headers.append(
    "Accept",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  );
  headers.append("Accept-Language", "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7");
  headers.append("Cache-Control", "no-cache");
  headers.append("Connection", "keep-alive");
  headers.append("Pragma", "no-cache");
  headers.append("Referer", `http://www.cgv.co.kr/theaters/?areacode=01&theaterCode=0074&date=${getKSTDateString()}`);
  headers.append("Upgrade-Insecure-Requests", "1");
  headers.append("Cookie", `ASP.NET_SessionId=${randomUUID()}`);

  const response = await fetch(
    `http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode=0074&date=${getKSTDateString()}`,
    {
      method: "GET",
      headers,
      redirect: "follow",
    },
  );
  const html = await response.text();
  const $ = cheerio.load(html);

  // 영화별 스케줄 추출
  const schedules: Schedule[] = [];

  // 영화별 스케줄 추출
  $(".sect-showtimes > ul > li").each((i, movieElement) => {
    const title = $(movieElement).find(".info-movie a strong").text().trim(); // 영화 제목
    const poster_id = $(movieElement).find(".info-movie a").attr("href")?.split("midx=")[1] ?? "";
    const poster_url = `https://img.cgv.co.kr/Movie/Thumbnail/Poster/0000${poster_id.substring(0, 2)}/${poster_id}/${poster_id}_320.jpg`;

    // 각 상영 정보 추출
    $(movieElement)
      .find(".type-hall")
      .each((j, hallElement) => {
        const hallType = $(hallElement).find(".info-hall ul li").next().prevAll().text().trim().replace(/\s+/g, " "); // 상영 유형
        const totalSeatsText = $(hallElement).find(".info-hall ul li:nth-child(3)").text();
        const totalSeats = parseInt(totalSeatsText.replace("총", "").replace("석", "").trim());

        // 시간표 추출
        $(hallElement)
          .find(".info-timetable ul li")
          .each((k, scheduleElement) => {
            const startTime = $(scheduleElement).find("a").attr("data-playstarttime") || "";
            const endTime = $(scheduleElement).find("a").attr("data-playendtime") || "";
            const remainingSeatsText = $(scheduleElement).find("a").attr("data-seatremaincnt");
            const remainingSeats = remainingSeatsText ? parseInt(remainingSeatsText) : 0;
            const bookedSeats = totalSeats - remainingSeats; // 예매된 좌석 수 계산

            schedules.push({
              title,
              poster_url,
              hallType,
              startTime,
              endTime,
              totalSeats,
              remainingSeats,
              bookedSeats,
            });
          });
      });
  });

  return schedules;
}
