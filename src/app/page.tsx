"use client";

import StandBy from "@/components/StandBy";
import Testing from "@/components/Testing";
import { Category, Recipe, RECIPES } from "@/constants/recipe";
import { shuffleArray } from "@/utils";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";

type Step = "standby" | "testing" | "finish";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("standby");
  const [quizzes, setQuizzes] = useState<Recipe[]>([]);

  function startTest(testingCategories: Category[]) {
    const testingRecipes = RECIPES.filter((recipe) => testingCategories.includes(recipe.category));
    setQuizzes(shuffleArray(testingRecipes));
    setCurrentStep("testing");
  }

  function endTest() {
    setQuizzes([]);
    setCurrentStep("standby");
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full items-center flex flex-col gap-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {currentStep !== "standby" ? (
            <Button variant="contained" onClick={() => endTest()}>
              처음으로
            </Button>
          ) : (
            <>
              <Link href="/practice">
                <Button variant="contained">연습 페이지로</Button>
              </Link>
              <Link href="/cgv-schedules">
                <Button variant="contained">오늘의 CGV 스케줄</Button>
              </Link>
              <Link href="/commercial-status">
                <Button variant="contained">오늘의 혼잡도</Button>
              </Link>
              <Link href="/e-mart-close">
                <Button variant="contained">이마트 휴무일</Button>
              </Link>
              <a href="https://data.seoul.go.kr/SeoulRtd/?hotspotNm=왕십리역" target="_blank">
                <Button variant="contained">
                  <OpenInNewIcon />
                </Button>
              </a>
            </>
          )}
        </div>
        {currentStep === "standby" && <StandBy onStart={(testingCategories) => startTest(testingCategories)} />}
        {currentStep === "testing" && <Testing quizzes={quizzes} onFinish={() => endTest()} />}
      </main>
    </div>
  );
}
