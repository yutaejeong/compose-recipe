"use server";

import * as cheerio from "cheerio";

export async function getEMartClose(): Promise<Date[]> {
  const response = await fetch("https://emartapp.emart.com/branch/view.do?id=1090");
  const html = await response.text();
  const $ = cheerio.load(html);

  const dates: Date[] = [];
  const selector = "#ern-container > div > div:nth-child(2) > div.box-info.other-info > dl:nth-child(2) > dd span";

  $(selector).each((_, element) => {
    const dateText = $(element).text().trim();
    if (dateText) {
      const [month, day] = dateText.split("/").map((num) => parseInt(num, 10));
      const date = new Date();
      date.setFullYear(new Date().getFullYear()); // 현재 연도 설정
      date.setMonth(month - 1); // JavaScript의 월은 0부터 시작
      date.setDate(day);
      dates.push(date);
    }
  });

  return dates;
}
