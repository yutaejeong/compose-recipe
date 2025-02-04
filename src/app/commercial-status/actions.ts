"use server";

export interface HourlyData {
  hour: string; // YYYYMMDDHH 형식의 시간 정보
  avgAmtSum: number; // 해당 시간의 평균 결제 금액 (원)
  cmrclLvl: number; // 상권 활성도 수준 (0~3 예상)
}

export interface CommercialStatusHistory {
  dateTime: string; // 데이터 기준 시각 (예: "※2025-01-29 22:00 기준")
  listSameWeekLastYear24Hour: HourlyData[]; // 작년 동일 요일의 24시간 데이터
  list24Hour: HourlyData[]; // 현재 24시간 데이터
  list28Day24Hour: HourlyData[]; // 28일 전 동일 요일의 24시간 데이터
}

export async function getCommercialStatus() {
  const response = await fetch(
    "https://data.seoul.go.kr/SeoulRtd/consumption/rsb-24hours?hotspotNm=왕십리역&rsbNm=제과/커피/패스트푸드",
  );
  const data: CommercialStatusHistory = await response.json();
  return data;
}

type CityData = {
  AREA_CMRCL_LVL: string;
  AREA_SH_PAYMENT_CNT: number;
  AREA_SH_PAYMENT_AMT_MIN: number;
  AREA_SH_PAYMENT_AMT_MAX: number;
  CMRCL_RSB: Array<{
    RSB_LRG_CTGR: string;
    RSB_MID_CTGR: string;
    RSB_PAYMENT_LVL: string;
    RSB_SH_PAYMENT_CNT: number;
    RSB_SH_PAYMENT_AMT_MIN: number;
    RSB_SH_PAYMENT_AMT_MAX: number;
    RSB_MCT_CNT: number;
    RSB_MCT_TIME: string;
  }>;
  CMRCL_MALE_RATE: number;
  CMRCL_FEMALE_RATE: number;
  CMRCL_10_RATE: number;
  CMRCL_20_RATE: number;
  CMRCL_30_RATE: number;
  CMRCL_40_RATE: number;
  CMRCL_50_RATE: number;
  CMRCL_60_RATE: number;
  CMRCL_PERSONAL_RATE: number;
  CMRCL_CORPORATION_RATE: number;
  CMRCL_TIME: string;
};

type CityDataAPIResult = {
  resultCode: string;
  resultMsg: string;
};

type CityDataResponse = {
  list_total_count: number;
  LIVE_CMRCL_STTS: CityData;
  AREA_NM: string;
  RESULT: CityDataAPIResult;
  AREA_CD: string;
};

export type CurrentStatus = {
  CMRCL_TIME: string;
  RSB_PAYMENT_LVL: string;
  RSB_SH_PAYMENT_CNT: number;
};

export async function getCityData() {
  const response = await fetch(
    `http://openapi.seoul.go.kr:8088/${process.env.OPEN_API_KEY}/json/citydata_cmrcl/1/5/왕십리역`,
  );
  const data: CityDataResponse = await response.json();
  const cafeData = data.LIVE_CMRCL_STTS.CMRCL_RSB.filter((item) => item.RSB_MID_CTGR === "제과/커피/패스트푸드")[0];
  return {
    CMRCL_TIME: data.LIVE_CMRCL_STTS.CMRCL_TIME,
    RSB_PAYMENT_LVL: cafeData?.RSB_PAYMENT_LVL,
    RSB_SH_PAYMENT_CNT: cafeData?.RSB_SH_PAYMENT_CNT,
  };
}
