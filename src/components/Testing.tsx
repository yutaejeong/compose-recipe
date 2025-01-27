import { selectMenuImage } from "@/utils";
import { Button, CardMedia, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Recipe } from "../constants/recipe";

interface Props {
  quizes: Recipe[];
  onFinish: () => void;
}

export default function Testing({ quizes, onFinish }: Props) {
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const timerLabelRef = useRef<HTMLSpanElement>(null);
  const elapsedTime = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const [progress, setProgress] = useState<number>(1);
  const totalElapsedTime = useRef<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    restartTimer();
  }, []);

  useEffect(() => {
    if (showRecipe) {
      nextButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [showRecipe]);

  function restartTimer() {
    elapsedTime.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (timerLabelRef.current) {
        timerLabelRef.current.innerText = elapsedTime.current.toFixed(2);
      }
      elapsedTime.current += 0.01;
      totalElapsedTime.current += 0.01;
    }, 10);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  function handleShowRecipe() {
    setShowRecipe(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  function handleNextQuiz() {
    if (progress === quizes.length) {
      setIsFinished(true);
    } else {
      setProgress((prev) => prev + 1);
      setShowRecipe(false);
      restartTimer();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-[50%] flex items-center gap-2">
        <LinearProgress variant="determinate" value={(progress / quizes.length) * 100} sx={{ flex: 1 }} />
        <Typography variant="body2">
          {progress} / {quizes.length}
        </Typography>
      </div>
      <Card sx={{ width: "100%", maxWidth: "1000px" }}>
        <CardMedia
          sx={{ backgroundSize: "contain", height: "300px" }}
          image={selectMenuImage(quizes[progress - 1].image_url)}
          title={quizes[progress - 1].name}
        />
        <form className="w-full" onSubmitCapture={(e) => handleSubmit(e)}>
          <CardContent>
            <div className="mb-3">
              <Typography variant="h5" component="span">
                {quizes[progress - 1].name}
              </Typography>
              <Typography variant="h6" component="span" sx={{ ml: 1 }} ref={timerLabelRef} />
            </div>
            <TextField
              multiline
              autoComplete="off"
              inputRef={inputRef}
              disabled={showRecipe}
              sx={{
                width: "100%",
              }}
            />
            {showRecipe && (
              <div className="mt-2 py-2 px-3.5 border rounded bg-gray-50">
                <Typography variant="body1" sx={{ fontWeight: "600", color: "#444" }}>
                  {quizes[progress - 1].recipe}
                </Typography>
              </div>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleShowRecipe} type="submit" disabled={showRecipe}>
              레시피 확인
            </Button>
            <Button size="small" onClick={handleNextQuiz} ref={nextButtonRef} disabled={isFinished}>
              다음 메뉴
            </Button>
          </CardActions>
        </form>
        {isFinished && (
          <CardContent sx={{ textAlign: "center" }}>
            <div>
              <Typography>
                총 소요 시간:&nbsp;
                <b>
                  {Math.floor(totalElapsedTime.current / 60)} 분 {(totalElapsedTime.current % 60).toFixed(2)}초
                </b>
              </Typography>
              <Typography>
                문제당 평균 소요 시간:&nbsp;
                <b>{(totalElapsedTime.current / quizes.length).toFixed(2)} 초</b>
              </Typography>
              <Button variant="text" onClick={() => onFinish()}>
                종료
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
