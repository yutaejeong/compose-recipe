export interface ApiResponse {
    statusCode: number;
    statusMessage: string;
    data: Screening[];
}

interface Screening {
    coCd: string;
    siteNo: string;
    siteNm: string;
    scnsNo: string;
    scnsNm: string;
    expoScnsNm: string;
    scnYmd: string;
    scnSseq: string;
    prodNo: string;
    expoProdNm: string;
    engProdNm: string;
    prodNm: string;
    movkndCd: string;
    movkndDsplNm: string;
    movkndDsplEnm: string;
    cratgClsCd: string;
    cratgClsNm: string;
    salsTznCd: string;
    salsTznNm: string;
    scnsrtTm: string;
    scnendTm: string;
    salEndTm: string;
    sascnsGradCd: string;
    sortOseq: string;
    sascnsGradNm: string;
    tcscnsGradCd: string;
    tcscnsGradNm: string;
    stcnt: string;
    cpSeatCnt: string;
    frSeatCnt: string;
    cntlYn: string;
    crntrvDsplYn: string;
    hotdlYn: string;
    dblfrNo: string | null;
    dblfrRpsntYn: string | null;
    iceconYn: string;
    arthsYn: string;
    srlsYn: string;
    childnMovYn: string;
    movclsCd: string;
    movclsNm: string;
    speclIndctTypCd: string;
    movTirCd: string;
    siteGradCd: string;
    srvltKindCd: string;
    slddKindCd: string;
    sesnNo: string | null;
    movNo: string;
    movNm: string;
    movEnm: string;
    mvSeatCnt: string;
    movfNo: string;
    bzplcNo: string;
    vatincYn: string;
    prdtypCd: string;
    prddtlTypCd: string;
    prdcmpTypCd: string;
    cxprdYn: string;
    scnsGradCd: string;
    prcrulDivCd: string;
    videoAddexpCd: string | null;
    videoAddexpCdNm: string | null;
    videoAddexpCont: string | null;
    sbtdivCd: string | null;
    sbtdivNm: string | null;
    physcFnm: string;
    physcFilePathnm: string;
    frtmpSeatCnt: string;
    hotdlDtlNo: string | null;
    rlMovStartTm: string;
    prmddNo: string | null;
    prmddNm: string | null;
    prodImg: string | null;
    cndProdYn: string | null;
    cndsaTypCd: string | null;
    cndSalYnList: string[] | null;
}

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