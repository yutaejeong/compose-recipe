"use client";

export const CATEGORIES = [
  "커피",
  "논커피",
  "프라페",
  "밀크쉐이크",
  "과일스무디",
  "요거트스무디",
  "에이드",
  "차",
  "과일주스",
  "시즌한정",
  "콤보",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Recipe {
  category: Category;
  name: string;
  recipe: string;
  image_url: string | string[];
}

export const RECIPES: Recipe[] = [
  {
    category: "커피",
    name: "에스프레소	HOT",
    recipe: "종이컵 / 에스프레소 2샷",
    image_url: "/images/에스프레소.jpg",
  },
  {
    category: "커피",
    name: "아메리카노	HOT",
    recipe: "종이컵 / 뜨거운 물 350g / 에스프레소 2샷",
    image_url: "/images/HOT_아메리카노.jpg",
  },
  {
    category: "커피",
    name: "아메리카노	ICE",
    recipe: "아이스컵 / 물 200g / 얼음 / 에스프레소 2샷",
    image_url: "/images/ICE_아메리카노.jpg",
  },
  {
    category: "커피",
    name: "카페라떼	HOT",
    recipe: "종이컵 / 베리에이션 2샷 + 스팀우유 270g",
    image_url: "/images/HOT_카페라떼.jpg",
  },
  {
    category: "커피",
    name: "카페라떼	ICE",
    recipe: "아이스컵 / 우유 200선 / 얼음 / 베리에이션 2샷",
    image_url: "/images/ICE_카페라떼.jpg",
  },
  {
    category: "커피",
    name: "카푸치노	HOT",
    recipe: "종이컵 / 베리에이션 2샷 + 스팀우유 250g / 시나몬파우더 토핑",
    image_url: "/images/카푸치노.jpg",
  },
  {
    category: "커피",
    name: "바닐라라떼	HOT",
    recipe: "종이컵 / 바닐라시럽 2펌프 + 설탕시럽 1펌프 + 베리에이션 2샷 + 스팀우유 250g",
    image_url: "/images/HOT_바닐라라떼.jpg",
  },
  {
    category: "커피",
    name: "바닐라라떼	ICE",
    recipe: "아이스컵 / 바닐라시럽 2펌프 + 설탕시럽 1펌프 + 우유 200선 / 섞기 / 얼음 / 베리에이션 2샷",
    image_url: "/images/ICE_바닐라라떼.jpg",
  },
  {
    category: "커피",
    name: "헤이즐넛라떼	HOT",
    recipe: "종이컵 / 헤이즐넛시럽 2펌프 + 설탕시럽 1펌프 + 베리에이션 2샷 + 스팀우유 250g",
    image_url: "/images/HOT_헤이즐넛라떼.jpg",
  },
  {
    category: "커피",
    name: "헤이즐넛라떼	ICE",
    recipe: "아이스컵 / 헤이즐넛시럽 2펌프 + 설탕시럽 1펌프 + 우유 200선 / 섞기 / 얼음 / 베리에이션 2샷",
    image_url: "/images/ICE_헤이즐넛_라떼.jpg",
  },
  {
    category: "커피",
    name: "카라멜마끼아또	HOT",
    recipe: "종이컵 / 카라멜소스 30g + 설탕시럽 2펌프 + 베리에이션 2샷 / 섞기 / 스팀우유 250g / 카라멜소스 토핑",
    image_url: "/images/HOT_카라멜마끼아또.jpg",
  },
  {
    category: "커피",
    name: "카라멜마끼아또	ICE",
    recipe: "아이스컵 / 카라멜베이스 200선 / 얼음 / 베리에이션 2샷 / 카라멜소스 토핑",
    image_url: "/images/ICE_카라멜마끼아또.jpg",
  },
  {
    category: "커피",
    name: "카페모카	HOT",
    recipe:
      "종이컵 / 초코소스 30g + 설탕시럽 2펌프 + 베리에이션 2샷 / 섞기 / 스팀우유 250g / 휘핑 + 초코소스 + 바리스타카카오 토핑",
    image_url: "/images/HOT_카페모카.jpg",
  },
  {
    category: "커피",
    name: "카페모카	ICE",
    recipe:
      "아이스컵 / 초코소스 30g + 설탕시럽 2펌프 + 베리에이션 2샷 / 섞기 / 샷 포함 우유 250선 / 얼음 / 휘핑 + 초코소스 + 바리스타카카오 토핑",
    image_url: "/images/ICE_카페모카.jpg",
  },
  {
    category: "커피",
    name: "돌체라떼	HOT",
    recipe: "종이컵 / 연유 50g + 스팀우유 250g / 섞기 / 베리에이션 2샷",
    image_url: "/images/HOT_돌체라떼.jpg",
  },
  {
    category: "커피",
    name: "돌체라떼	ICE",
    recipe: "아이스컵 / 돌체베이스 200선 / 얼음 / 베리에이션 2샷",
    image_url: "/images/ICE_돌체라떼.jpg",
  },
  {
    category: "커피",
    name: "흑당카페라떼	ICE",
    recipe: "아이스컵 / 우유 200g / 흑당소스 45g 두르기 / 얼음 / 샷추가 1번 버튼",
    image_url: "/images/흑당카페라떼.jpg",
  },
  {
    category: "커피",
    name: "아인슈페너라떼	ICE",
    recipe:
      "아이스컵 / 설탕시럽 1펌프 + 바닐라시럽 0.5펌프 + 우유 150g / 섞기 / 얼음 밑선 / 베리에이션 2샷 / 에어레이팅볼 (설탕시럽 1.5펌프 + 밀크쉐이크베이스 70g 믹스 2번) / 바리스타카카오 토핑",
    image_url: "/images/아인슈페너라떼.jpg",
  },
  {
    category: "커피",
    name: "달고나라떼	ICE",
    recipe:
      "아이스컵 / 흑당소스 10g + 설탕시럽 1펌프 + 바닐라시럽 1펌프 + 우유 200g / 에스프레소 2샷 / 달고나 토핑 30g",
    image_url: "/images/달고나라떼.jpg",
  },
  {
    category: "커피",
    name: "더치커피	HOT",
    recipe: "종이컵 / 콜드브루파우치 + 뜨거운 물 260g",
    image_url: "/images/HOT_더치커피.jpg",
  },
  {
    category: "커피",
    name: "더치커피	ICE",
    recipe: "아이스컵 / 콜드브루파우치 + 물 200g / 얼음",
    image_url: "/images/ICE_더치커피.jpg",
  },
  {
    category: "커피",
    name: "더치라떼	HOT",
    recipe: "스팀피쳐 / 콜드브루파우치 + 우유 260g / 스팀",
    image_url: "/images/HOT_더치라떼.jpg",
  },
  {
    category: "커피",
    name: "더치라떼	ICE",
    recipe: "아이스컵 / 콜드브루파우치 + 우유 150g / 얼음",
    image_url: "/images/ICE_더치라떼.jpg",
  },
  {
    category: "커피",
    name: "아인슈페너(더치) ICE",
    recipe:
      "아이스컵 / 물 100g + 콜드브루파우치 + 설탕시럽 1펌프 + 바닐라시럽 0.5펌프 / 얼음 밑선 / 에어레이팅볼 (설탕시럽 1.5펌프 + 밀크쉐이크베이스 70g / 믹스 2번) / 바리스타카카오토핑",
    image_url: "/images/아인슈페너.jpg",
  },
  {
    category: "커피",
    name: "디카페인더치	HOT",
    recipe: "종이컵 / 디카페인파우치 + 뜨거운물 260g",
    image_url: "/images/HOT_디카페인_더치커피.jpg",
  },
  {
    category: "커피",
    name: "디카페인더치	ICE",
    recipe: "아이스컵 / 디카페인파우치 + 물 200g / 얼음",
    image_url: "/images/ICE_디카페인_더치커피.jpg",
  },
  {
    category: "커피",
    name: "디카페인더치라떼	HOT",
    recipe: "스팀피쳐 / 디카페인파우치 + 우유 260g / 스팀",
    image_url: "/images/HOT_디카페인_더치라떼.jpg",
  },
  {
    category: "커피",
    name: "디카페인더치라떼	ICE",
    recipe: "아이스컵 / 디카페인파우치 + 우유 150g / 얼음",
    image_url: "/images/ICE__디카페인_더치라떼.jpg",
  },
  {
    category: "논커피",
    name: "곡물라떼	HOT",
    recipe: "스팀피쳐 / 우유 300g + 곡물파우더 60g + 설탕시럽 1.5펌프 / 스팀 / 아몬드슬라이스 토핑",
    image_url: "/images/HOT_곡물라떼.jpg",
  },
  {
    category: "논커피",
    name: "곡물라떼	ICE",
    recipe: "블렌더볼 / 우유 250g + 곡물파우더 60g + 설탕시럽 1.5펌프 / 믹스 1번 / 얼음 / 아몬드슬라이스 토핑",
    image_url: "/images/ICE_곡물라떼.jpg",
  },
  {
    category: "논커피",
    name: "고구마라떼	HOT",
    recipe: "스팀피쳐 / 고구마페이스트 1포 + 설탕시럽 2.5펌프 + 우유 250g / 스팀",
    image_url: "/images/HOT_고구마라떼.jpg",
  },
  {
    category: "논커피",
    name: "고구마라떼	ICE",
    recipe: "블렌더볼 / 고구마페이스트 1포 + 설탕시럽 1.5펌프 + 우유 200g / 믹스 1번 / 얼음",
    image_url: "/images/ICE_고구마라떼.jpg",
  },
  {
    category: "논커피",
    name: "더블초코라떼	HOT",
    recipe: "스팀피쳐 / 더블초코베이스 330g / 스팀 / 휘핑 + 초소소스 + 초콜릿청크 토핑",
    image_url: "/images/HOT_더블초코라떼.jpg",
  },
  {
    category: "논커피",
    name: "더블초코라떼	ICE",
    recipe: "아이스컵 / 더블초코페이스 300선 / 얼음 / 휘핑 + 초소소스 + 초콜릿청크 토핑",
    image_url: "/images/ICE_더블초코라떼.jpg",
  },
  {
    category: "논커피",
    name: "그린티라떼	HOT",
    recipe: "스팀피쳐 / 우유 300g + 녹차라떼파우더 35g + 설탕시럽 1펌프 / 스팀",
    image_url: "/images/HOT_그린티라떼.jpg",
  },
  {
    category: "논커피",
    name: "그린티라떼	ICE",
    recipe: "아이스컵 / 우유 250g + 녹차라떼파우더 35g / 섞기 / 얼음",
    image_url: "/images/ICE_그린티라떼.jpg",
  },
  {
    category: "논커피",
    name: "쿠키초코라떼	HOT",
    recipe: "스팀피쳐 / 쿠앤크베이스 330g / 스팀 / 휘핑 + 초소소스 + 쿠키크럼 토핑",
    image_url: "/images/HOT_쿠키초코라떼.jpg",
  },
  {
    category: "논커피",
    name: "쿠키초코라떼	ICE",
    recipe: "아이스컵 / 쿠앤크베이스 300선 / 얼음 / 휘핑 + 초소소스 + 쿠키크럼 토핑",
    image_url: "/images/ICE_쿠키초코라떼.jpg",
  },
  {
    category: "논커피",
    name: "민트초코오레오라떼	HOT",
    recipe:
      "스팀피쳐 / 우유 300g + 민트초코파우더 40g + 설탕시럽 1펌프 / 스팀 / 종이컵에 따르기 / 휘핑 + 초코소스 + 쿠키크럼 + 오레오쿠키 토핑",
    image_url: "/images/HOT_민트초코오레오라떼.jpg",
  },
  {
    category: "논커피",
    name: "민트초코오레오라떼	ICE",
    recipe: "아이스컵 / 우유 250g + 민트초코파우더 40g / 섞기 / 얼음 / 휘핑 + 초코소스 + 쿠키크럼 + 오레오쿠키 토핑",
    image_url: "/images/ICE_민트초코오레오라떼.jpg",
  },
  {
    category: "논커피",
    name: "흑당밀크	ICE",
    recipe: "아이스컵 / 우유 250g / 흑당소스 50g 두르기 / 얼음",
    image_url: "/images/흑당밀크(우유).jpg",
  },
  {
    category: "논커피",
    name: "밀크티	HOT",
    recipe: "스팀피쳐 / 밀크티베이스 330g / 스팀",
    image_url: "/images/HOT_밀크티.jpg",
  },
  {
    category: "논커피",
    name: "밀크티	ICE",
    recipe: "아이스컵 / 밀크티베이스 300선 / 얼음",
    image_url: "/images/ICE_밀크티.jpg",
  },
  {
    category: "논커피",
    name: "딸기라떼	ICE",
    recipe: "아이스컵 / 딸기퓨레 120g + 우유 160g + 얼음 / 휘핑 + 딸기퓨레 토핑",
    image_url: "/images/딸기라떼.jpg",
  },
  {
    category: "논커피",
    name: "망고라떼	ICE",
    recipe: "아이스컵 / 망고퓨레 120g + 우유 160g + 얼음 / 휘핑 + 망고퓨레 토핑",
    image_url: "/images/망고라떼.jpg",
  },
  {
    category: "논커피",
    name: "블루베리라떼	ICE",
    recipe: "아이스컵 / 블루베리 120g + 우유 160g + 얼음 / 휘핑 + 블루베리퓨레 토핑",
    image_url: "/images/블루베리라떼.jpg",
  },
  {
    category: "프라페",
    name: "리얼초코자바칩프라페",
    recipe:
      "블렌더볼 / 우유 150g + 자바칩파우더 60g + 설탕시럽 2펌프 + 얼음 / 믹스 3번 / 휘핑 + 초코소스 + 초콜릿청크 토핑",
    image_url: "/images/리얼초코자바칩프라페.jpg",
  },
  {
    category: "프라페",
    name: "쿠키초코프라페",
    recipe: "블렌더볼 / 우유 150g + 쿠키앤크림파우더 60g + 얼음 / 믹스 3번 / 휘핑 + 초코소스 + 쿠키크럼 토핑",
    image_url: "/images/쿠키초코프라페.jpg",
  },
  {
    category: "프라페",
    name: "민트초코오레오프라페",
    recipe:
      "블렌더볼 / 우유 150g + 민트초코파우더 60g + 설탕시럽 1펌프 + 얼음 / 믹스 3번 / 휘핑 + 초코소스 + 쿠키크럼 + 오레오 토핑",
    image_url: "/images/민트초코오레오프라페.jpg",
  },
  {
    category: "프라페",
    name: "그린티프라페",
    recipe: "블렌더볼 / 우유 150g + 녹차파우더 60g + 설탕시럽 3펌프 + 얼음 / 믹스 3번 / 휘핑 + 녹차라떼파우더 토핑",
    image_url: "/images/그린티프라페.jpg",
  },
  {
    category: "프라페",
    name: "모카자바칩프라페",
    recipe:
      "블렌더볼 / 우유 100g + 자바칩파우더 60g + 설탕시럽 2펌프 + 얼음 / 믹스 3번 / 에스프레소 2샷 / 휘핑 + 초코소스 + 초콜릿청크 토핑",
    image_url: "/images/모카자바칩프라페.jpg",
  },
  {
    category: "밀크쉐이크",
    name: "플레인밀크쉐이크	ICE",
    recipe: "블렌더볼 / 밀크쉐이크베이스 180g + 설탕시럽 3펌프 + 밀크쉐이크베이스 40g + 얼음 / 믹스 3번",
    image_url: "/images/플레인_밀크쉐이크.jpg",
  },
  {
    category: "밀크쉐이크",
    name: "팥절미밀크쉐이크	ICE",
    recipe:
      "블렌더볼 / 밀크쉐이크베이스 150g + 설탕시럽 3펌프 + 밀크쉐이크베이스 40g + 빙수팥 40g + 얼음 / 믹스 3번 / 빙수팥 60g + 인절미 20g",
    image_url: "/images/팥절미_밀크쉐이크.jpg",
  },
  {
    category: "밀크쉐이크",
    name: "쿠키밀크쉐이크	ICE",
    recipe:
      "블렌더볼 / 밀크쉐이크베이스 150g + 설탕시럽 3펌프 + 밀크쉐이크베이스 40g + 얼음 / 믹스 3번 / 로투스크럼블 15g 섞고 / 컵 벽면에 카라멜 소스 두르기 / 로투스크럼블 10g + 로투스 1개",
    image_url: "/images/쿠키_밀크쉐이크.jpg",
  },
  {
    category: "밀크쉐이크",
    name: "캔디소다밀크쉐이크	ICE",
    recipe:
      "블렌더볼 / 밀크쉐이크베이스 160g + 설탕시럽 3펌프 + 밀크쉐이크베이스 40g + 얼음 / 믹스 3번 / 컵에 150선까지 따르고 / 캔디소다베이스 40g 섞고 / 나머지 따르기",
    image_url: "/images/캔디소다_밀크쉐이크.jpg",
  },
  {
    category: "밀크쉐이크",
    name: "커피밀크쉐이크	ICE",
    recipe:
      "블렌더볼 / 밀크쉐이크베이스 150g + 설탕시럽 3펌프 + 밀크쉐이크베이스 50g + 얼음 / 믹스 3번 / 에스프레소 2샷",
    image_url: "/images/커피밀크쉐이크.jpg",
  },
  {
    category: "과일스무디",
    name: "딸기스무디	ICE",
    recipe: "블렌더볼 / 딸기스무디 160g + 우유 140g + 얼음 / 믹스 2번",
    image_url: "/images/딸기스무디.jpg",
  },
  {
    category: "과일스무디",
    name: "망고스무디	ICE",
    recipe: "블렌더볼 / 망고스무디 160g + 우유 140g + 얼음 / 믹스 2번",
    image_url: "/images/망고스무디.jpg",
  },
  {
    category: "과일스무디",
    name: "블루베리스무디	ICE",
    recipe: "블렌더볼 / 블루베리스무디 160g + 우유 140g + 냉동블루베리 15g + 얼음 / 믹스 2번",
    image_url: "/images/블루베리스무디.jpg",
  },
  {
    category: "과일스무디",
    name: "유자스무디	ICE",
    recipe: "블렌더볼 / 유자스무디 100g + 레몬후르츠 1펌프 + 물 140g + 얼음 / 믹스 2번 / 유자청 30g 토핑",
    image_url: "/images/유자스무디.jpg",
  },
  {
    category: "요거트스무디",
    name: "딸기요거트	ICE",
    recipe: "블렌더볼 / 우유 170g + 설탕시럽 1펌프 + 요거트파우더 60g + 얼음 / 믹스 3번 / 컵에 딸기퓨레 40g 둘러주기",
    image_url: "/images/딸기요거트스무디.jpg",
  },
  {
    category: "요거트스무디",
    name: "망고요거트	ICE",
    recipe: "블렌더볼 / 우유 170g + 설탕시럽 1펌프 + 요거트파우더 60g + 얼음 / 믹스 3번 / 컵에 망고퓨레 40g 둘러주기",
    image_url: "/images/망고요거트스무디.jpg",
  },
  {
    category: "요거트스무디",
    name: "블루베리요거트	ICE",
    recipe:
      "블렌더볼 / 우유 170g + 설탕시럽 1펌프 + 요거트파우더 60g + 얼음 / 믹스 3번 / 컵에 블루베리퓨레 40g 둘러주기",
    image_url: "/images/블루베리요거트스무디.jpg",
  },
  {
    category: "요거트스무디",
    name: "플레인요거트	ICE",
    recipe: "블렌더볼 / 우유 200g + 설탕시럽 1.5펌프 + 요거트파우더 70g + 얼음 / 믹스 3번",
    image_url: "/images/플레인요거트스무디.jpg",
  },
  {
    category: "에이드",
    name: "자몽에이드	ICE",
    recipe: "아이스컵 / 자몽에이드 40g + 사이다 250ml / 섞기 / 얼음 / 자몽슬라이스 1개 토핑",
    image_url: "/images/자몽에이드.jpg",
  },
  {
    category: "에이드",
    name: "레몬에이드	ICE",
    recipe: "아이스컵 / 레몬에이드 40g + 사이다 250ml / 섞기 / 얼음 / 레몬슬라이스 1개 토핑",
    image_url: "/images/레몬에이드.jpg",
  },
  {
    category: "에이드",
    name: "망고에이드	ICE",
    recipe: "아이스컵 / 망고퓨레 40g + 사이다 250ml / 섞기 / 얼음",
    image_url: "/images/망고에이드.jpg",
  },
  {
    category: "에이드",
    name: "청포도에이드	ICE",
    recipe: "아이스컵 / 청포도에이드 50g + 사이다 250ml / 섞기 / 얼음",
    image_url: "/images/청포도_스페셜에이드.jpg",
  },
  {
    category: "에이드",
    name: "패션후르츠에이드	ICE",
    recipe: "아이스컵 / 패션후루츠농축액 50g + 사이다 250ml / 섞기 / 얼음",
    image_url: "/images/패션후르츠_스페셜에이드.jpg",
  },
  {
    category: "에이드",
    name: "블루레몬에이드	ICE",
    recipe: "아이스컵 / 레몬에이드 30g + 블루큐라소시럽 2펌프 + 사이다 250ml / 섞기 / 얼음 / 레몬슬라이스 1개 토핑",
    image_url: "/images/블루레몬_스페셜에이드.jpg",
  },
  {
    category: "에이드",
    name: "유자에이드	ICE",
    recipe: "아이스컵 / 유자청 80g + 사이다 250ml / 섞기 / 얼음 / 레몬슬라이스 1개 토핑",
    image_url: "/images/유자에이드.jpg",
  },
  {
    category: "차",
    name: "페퍼민트, 캐모마일, 로즈마리, 얼그레이, 블랙퍼스트 HOT",
    recipe: "종이컵 / 티백 한 개 + 뜨거운 물 350g",
    image_url: [
      "/images/HOT_페퍼민트.jpg",
      "/images/HOT_캐모마일.jpg",
      "/images/HOT_로즈마리.jpg",
      "/images/HOT_얼그레이.jpg",
      "/images/HOT_블랙퍼스트.jpg",
    ],
  },
  {
    category: "차",
    name: "페퍼민트, 캐모마일, 로즈마리, 얼그레이, 블랙퍼스트 ICE",
    recipe: "계량컵 / 티백 한 개 + 뜨거운 물 200g / 2분 우리기 / 얼음",
    image_url: [
      "/images/ICE_페퍼민트.jpg",
      "/images/ICE_캐모마일.jpg",
      "/images/ICE_로즈마리.jpg",
      "/images/ICE_얼그레이.jpg",
      "/images/ICE_블랙퍼스트.jpg",
    ],
  },
  {
    category: "차",
    name: "복숭아티	HOT",
    recipe: "종이컵 / 뜨거운물 350g + 아이스티파우더 50g / 레몬슬라이스 1개 토핑",
    image_url: "/images/HOT_아이스티.jpg",
  },
  {
    category: "차",
    name: "복숭아티	ICE",
    recipe: "아이스컵 / 복숭아티베이스 300선 + 얼음 / 레몬슬라이스 1개 토핑",
    image_url: "/images/ICE_아이스티.jpg",
  },
  {
    category: "차",
    name: "자몽티	HOT",
    recipe:
      "종이컵 / 자몽청 80g + 자몽에이드 30g + 레몬후르츠 1펌프 + 뜨거운 물 260g 이상 / 섞기 / 자몽슬라이스 1개 토핑",
    image_url: "/images/HOT_자몽티.jpg",
  },
  {
    category: "차",
    name: "자몽티	ICE",
    recipe:
      "아이스컵 / 자몽청 80g + 자몽에이드 30g + 레몬후르츠 1펌프 + 물 200g 이상 / 섞기 / 얼음 / 자몽슬라이스 1개 토핑",
    image_url: "/images/ICE_자몽티.jpg",
  },
  {
    category: "차",
    name: "레몬티	HOT",
    recipe:
      "종이컵 / 레몬청 80g + 레몬에이드 30g + 레몬후르츠 1펌프 + 뜨거운 물 260g 이상 / 섞기 / 레몬슬라이스 1개 토핑",
    image_url: "/images/HOT_레몬티.jpg",
  },
  {
    category: "차",
    name: "레몬티	ICE",
    recipe:
      "아이스컵 / 레몬청 80g + 레몬에이드 30g + 레몬후르츠 1펌프 + 물 200g 이상 / 섞기 / 얼음 / 레몬슬라이스 1개 토핑",
    image_url: "/images/ICE_레몬티.jpg",
  },
  {
    category: "차",
    name: "유자티	HOT",
    recipe: "종이컵 / 유자청 100g + 레몬후르츠 1펌프 + 뜨거운 물 260g 이상 / 섞기",
    image_url: "/images/HOT_유자티.jpg",
  },
  {
    category: "차",
    name: "유자티	ICE",
    recipe: "아이스컵 / 유자청 100g + 레몬후르츠 1펌프 + 물 200g 이상 / 섞기 / 얼음",
    image_url: "/images/ICE_유자티.jpg",
  },
  {
    category: "차",
    name: "자몽허니블랙티	HOT",
    recipe:
      "스팀피쳐 / 자몽허니베이스 90g + 설탕시럽 1펌프 + 뜨거운 물 300g / 스팀 / 종이컵에 블랙페스트 티백 1개 넣고 붇기",
    image_url: "/images/HOT_자몽허니블랙티.jpg",
  },
  {
    category: "차",
    name: "자몽허니블랙티	ICE",
    recipe:
      "계량컵 / 블랙퍼스트티백 1개 + 뜨거운 물 150g / 2분 우리기 / 컵에 자몽허니 베이스 90g + 우린 티 붇고 / 티백 넣고 얼음 채우기",
    image_url: "/images/ICE_자몽허니블랙티.jpg",
  },
  {
    category: "과일주스",
    name: "키위주스	ICE",
    recipe: "블렌더볼 / 갈아만든그린키위 1팩 + 미온수 160g / 믹스 2번 / 얼음(2/3)",
    image_url: "/images/키위주스.jpg",
  },
  {
    category: "과일주스",
    name: "복숭아주스	ICE",
    recipe: "블렌더볼 / 갈아만든복숭아 1팩 + 미온수 160g / 믹스 2번 / 얼음(2/3)",
    image_url: "/images/복숭아주스.jpg",
  },
  {
    category: "과일주스",
    name: "오렌지당근주스	ICE",
    recipe: "블렌더볼 / 갈아만든오렌지당근 1팩 + 미온수 160g / 믹스 2번 / 얼음(2/3)",
    image_url: "/images/오렌지당근주스.jpg",
  },
  {
    category: "과일주스",
    name: "샤인머스캣케일주스	ICE",
    recipe: "블렌더볼 / 갈아만든샤인파인케일 1팩 + 미온수 160g / 믹스 2번 / 얼음(2/3)",
    image_url: "/images/샤인머스캣케일주스.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기모찌밀크쉐이크	ICE",
    recipe:
      "블렌더볼 / 밀크쉐이크베이스 150g + 밀크쉐이크파우더 40g + 설탕시럽 2펌프 + 딸기베이스 90g + 얼음 280g / 믹스 3번 / 컵에 옮겨 담기 / 휘핑 + 1/2생딸기 1개 + 1/2 모찌 4개",
    image_url: "/images/생딸기_모찌_밀크쉐이크.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기가나슈라떼	ICE",
    recipe: "아이스컵 / 딸기베이스 60g + 얼음 가득 + 우유 200g / 딸기가나슈 1스쿱 + 다진생딸기 20g 토핑",
    image_url: "/images/생딸기_가나슈_라떼.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기망고아이스티	ICE",
    recipe: "아이스컵 / 딸기아이스티베이스 300선 + 얼음가득 / 냉동망고다이스 80g + 다진생딸기 20g 토핑",
    image_url: "/images/생딸기_망고_아이스티.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기주스	ICE",
    recipe:
      "블렌더볼 / 갈아만든딸기주스 1팩 + 물 180g / 믹스 2번 / 블렌더볼에 다진생딸기 20g 넣고 믹스 / 컵에 옮겨 담기 / 얼음 가득",
    image_url: "/images/생딸기주스.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기레몬그라스티 HOT",
    recipe: "종이컵 / 딸기베이스 30g + 레몬에이드 10g + 레몬그라스티백 1개 + 다진생딸기 20g + 뜨거운 물 260g / 믹스",
    image_url: "/images/HOT_생딸기_레몬글라스티.jpg",
  },
  {
    category: "시즌한정",
    name: "생딸기레몬그라스티 ICE",
    recipe:
      "계량컵 / 레몬그라스티백 1개 + 뜨거운 물 100g / 컵에 딸기베이스 30g + 레몬에이드 10g + 다진생딸기 20g + 얼음 가득 / 우린 티 담기 / 물 100g / 믹스",
    image_url: "/images/ICE_생딸기_레몬글라스티.jpg",
  },
  {
    category: "차",
    name: "빅포즈 아이스티",
    recipe: "빅포즈컵 / 아이스티베이스 450g + 얼음",
    image_url: "/images/ICE_빅포즈_아이스티.jpg",
  },
  {
    category: "차",
    name: "아망추",
    recipe: "아이스컵 / 아이스티베이스 300선 + 얼음 / 냉동망고 80g",
    image_url: "/images/아망추.jpg",
  },
  {
    category: "차",
    name: "빅포즈 아망추",
    recipe: "빅포즈컵 / 아이스티베이스 450g + 얼음 / 냉동망고 120g",
    image_url: "/images/빅포즈_아망추.jpg",
  },
  {
    category: "커피",
    name: "아샷추",
    recipe: "아이스컵 / 아이스티베이스 300선 + 얼음 / 에스프레소 2샷",
    image_url: "/images/아샷추.jpg",
  },
  {
    category: "커피",
    name: "빅포즈 아샷추",
    recipe: "빅포즈컵 / 아이스티베이스 450g + 얼음 / 에스프레소 2샷",
    image_url: "/images/빅포즈_아샷추.jpg",
  },
  {
    category: "콤보",
    name: "라떼는 말차야",
    recipe: "아이스 카페라떼 + 말차 팝콘",
    image_url: "/images/라떼는 말차야.jpg",
  },
  {
    category: "콤보",
    name: "커피엔 역시 커피빵",
    recipe: "아이스 아메리카노 + 커피콩빵",
    image_url: "/images/커피엔 역시 커피빵.jpg",
  },
  {
    category: "콤보",
    name: "묻고 더블샷으로 가",
    recipe: "커피 밀크쉐이크 + 더블샷 카라멜 팝콘",
    image_url: "/images/묻고 더블샷으로 가.jpg",
  },
  {
    category: "콤보",
    name: "쫀득카노",
    recipe: "아이스 아메리카노 + 쫀득 쿠키",
    image_url: "/images/쫀득카노.jpg",
  },
  {
    category: "콤보",
    name: "헨젤과 프레첼",
    recipe: "아이스티 + 미니 프레첼",
    image_url: "/images/헨젤과 프레첼.jpg",
  },
  {
    category: "콤보",
    name: "붕어는 T입니다",
    recipe: "아이스 밀크티 + 팥 미니붕어빵",
    image_url: "/images/붕어는 T입니다.jpg",
  },
  {
    category: "콤보",
    name: "딸기가 부라운 붕어",
    recipe: "딸기라떼 + 브라운 붕어딕만스 쿠키",
    image_url: "/images/딸기가 부라운 붕어.jpg",
  },
  {
    category: "콤보",
    name: "멜로드라마 쉐이크",
    recipe: "커피 밀크쉐이크 + 초코마쉬멜로",
    image_url: "/images/멜로드라마 쉐이크.jpg",
  },
  {
    category: "콤보",
    name: "아아~ 초코볼~",
    recipe: "아이스 아메리카노 + 초코볼",
    image_url: "/images/아아~ 초코볼~.jpg",
  },
];
