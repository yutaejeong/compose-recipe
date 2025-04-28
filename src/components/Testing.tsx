import { generateRecipe } from "@/api/gemini";
import { selectMenuImage } from "@/utils";
import { Button, CardMedia, CircularProgress, LinearProgress } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Recipe } from "../constants/recipe";

interface Props {
  quizes: Recipe[];
  onFinish: () => void;
}

export default function Testing({ quizes, onFinish }: Props) {
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const timerLabelRef = useRef<HTMLSpanElement>(null);
  const elapsedTime = useRef<number>(0);
  const totalElapsedTime = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const menuImage = useMemo(() => selectMenuImage(quizes[progress - 1].image_url), [progress]);

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

  async function handleGradeRecipe() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setLoading(true);
    try {
      const result = await generateRecipe(quizes[progress - 1].recipe, inputRef.current?.value || "");
      setResult(result || "채점 결과를 불러오지 못했습니다.");
    } catch {
      setResult("채점 결과를 불러오지 못했습니다. (오류)");
    } finally {
      setLoading(false);
      setShowRecipe(true);
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
          image={menuImage}
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
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "600", color: result.includes("정답") ? "#399" : "#933" }}
                  dangerouslySetInnerHTML={{ __html: result }}
                />
              </div>
            )}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleGradeRecipe} type="submit" disabled={showRecipe || loading}>
              {loading ? <CircularProgress size={20} color="inherit" /> : "채점"}
            </Button>
            <Button size="small" onClick={handleNextQuiz} ref={nextButtonRef} disabled={isFinished || loading}>
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
