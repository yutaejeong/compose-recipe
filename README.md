# 컴포즈 레시피

![compose](https://composecoffee.com/files/attach/images/182/bcb39e3ac799ff52cdf0d32a8ebfbf92.jpg)

## 개요

컴포즈커피 아르바이트를 시작하면서 레시피를 외우기 위해 만든 간단한 서비스입니다.

## 주요 기능

1. 카테고리별 레시피 암기
2. 카테고리별 레시피 테스트
3. CGV 왕십리 지점 상영 스케줄 및 예매 현황 조회
   - CGV 웹사이트를 [cheerio](https://www.npmjs.com/package/cheerio) 라이브러리를 활용하여 실시간 크롤링
4. 왕십리역 권역 상권 혼잡도 조회
   - [서울시 실시간 상권현황데이터 API](https://data.seoul.go.kr/dataList/OA-22385/F/1/datasetView.do) 연동
