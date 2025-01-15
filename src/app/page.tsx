"use client";

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { CATEGORIES, Recipe, RECIPES } from "../constants/recipe";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export default function Home() {
  const [quiz, setQuiz] = useState<Recipe>({ category: "", name: "", recipe: "" });
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const [testingCategories, setTestingCategories] = useState<Record<string, boolean>>(CATEGORIES.reduce((acc, category) => Object.assign(acc, { [category]: true }), {}));
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    handleNextQuiz();
  }, [testingCategories]);

  useEffect(() => {
    if (showRecipe) {
      nextButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [showRecipe]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handleShowRecipe() {
    setShowRecipe(true);
  }

  function handleNextQuiz() {
    const candidates = RECIPES.filter((recipe) => testingCategories[recipe.category]);
    if (candidates.length === 0) {
      setQuiz({
        category: "",
        name: "",
        recipe: "",
      });
    } else {
      setQuiz(candidates[getRandomInt(0, candidates.length - 1)]);
    }
    setShowRecipe(false);
  }

  function handleTestingCategoryChanged(category: string, changedTo: boolean) {
    setTestingCategories((prev) => ({
      ...prev,
      [category]: changedTo,
    }));
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-dvh p-8 pb-20 gap-6 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full items-center flex flex-col gap-2">
        <Link href="/practice">
          <Button variant="contained">연습 페이지로</Button>
        </Link>
        <FormGroup sx={{ display: "flex", gap: 1, flexDirection: "row" }}>
          {CATEGORIES.map((category) => (
            <FormControlLabel key={category} control={<Checkbox checked={testingCategories[category]} onChange={(e) => handleTestingCategoryChanged(category, e.target.checked)} />} label={category} />
          ))}
        </FormGroup>
        <Card sx={{ width: "100%" }}>
          <form className="w-full" onSubmitCapture={(e) => handleSubmit(e)}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                {quiz.name}
              </Typography>
              <TextField
                multiline
                autoComplete="off"
                inputRef={inputRef}
                disabled={showRecipe}
                sx={{
                  width: "100%",
                }}
                onFocus={(e) => (e.target.value = "")}
              />
              {showRecipe && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {quiz.recipe}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleShowRecipe} type="submit">
                레시피 확인
              </Button>
              <Button size="small" onClick={handleNextQuiz} ref={nextButtonRef}>
                다음 메뉴
              </Button>
            </CardActions>
          </form>
        </Card>
      </main>
    </div>
  );
}
