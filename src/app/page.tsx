"use client"

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormEvent, useEffect, useState } from 'react';
import { Recipe, RECIPES } from './recipe';

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function getNextRandomQuiz() {
  return RECIPES[getRandomInt(0, RECIPES.length - 1)];
}

export default function Home() {
  const [quiz, setQuiz] = useState<Recipe>({ name: "", recipe: ""})
  const [showRecipe, setShowRecipe] = useState<boolean>(false)

  useEffect(() => {
    handleNextQuiz();
  }, [])

  function handleSubmit(e: FormEvent) {
e.preventDefault();
handleShowRecipe();
  }

  function handleShowRecipe() {
    setShowRecipe(true)
  }

  function handleNextQuiz() {
    setQuiz(getNextRandomQuiz());
    setShowRecipe(false);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-[100dvh] p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Card sx={{ width: "50dvw", minWidth: "300px" }}>
      <form className='w-full' onSubmitCapture={(e) => handleSubmit(e)}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
          { quiz.name }
        </Typography>
        { showRecipe && <Typography variant="body2" sx={{ mb: 1.5 }}>
          {quiz.recipe}
        </Typography>} 
        <TextField
        disabled={showRecipe}
          sx={{
            width: "100%"
          }}
        />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleShowRecipe} type="submit">레시피 확인</Button>
        <Button size="small" onClick={handleNextQuiz} >다음 메뉴</Button>
      </CardActions>
      </form>
    </Card>
      </main>
    </div>
  );
}
