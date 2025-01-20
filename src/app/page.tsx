"use client";

import StandBy from "@/components/StandBy";
import Testing from "@/components/Testing";
import { Category, Recipe, RECIPES } from "@/constants/recipe";
import { shuffleArray } from "@/utils";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useState } from "react";

type Step = "standby" | "testing" | "finish";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("standby");
  const [quizes, setQuizes] = useState<Recipe[]>([]);

  function startTest(testingCategories: Category[]) {
    const testingRecipes = RECIPES.filter((recipe) => testingCategories.includes(recipe.category));
    setQuizes(shuffleArray(testingRecipes));
    setCurrentStep("testing");
  }

  function endTest() {
    setQuizes([]);
    setCurrentStep("standby");
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full items-center flex flex-col gap-8">
        <div className="flex gap-2">
          <Button variant="contained" onClick={() => endTest()}>
            처음으로
          </Button>
          <Link href="/practice">
            <Button variant="contained">연습 페이지로</Button>
          </Link>
        </div>
        {currentStep === "standby" && <StandBy onStart={(testingCategories) => startTest(testingCategories)} />}
        {currentStep === "testing" && <Testing quizes={quizes} onFinish={() => endTest()} />}
      </main>
    </div>
  );
}
