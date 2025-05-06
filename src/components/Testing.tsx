import { generateRecipe, commentOnResult } from "@/api/gemini";
import { selectMenuImage } from "@/utils";
import {
  Button,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import { Recipe } from "../constants/recipe";

interface Props {
  quizes: Recipe[];
  onFinish: () => void;
}

interface QuizResult {
  recipe: string;
  userAnswer: string;
  result: string;
  imageUrl: string | string[];
  name: string;
}

export default function Testing({ quizes, onFinish }: Props) {
  const [showRecipe, setShowRecipe] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(1);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showShine, setShowShine] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [comment, setComment] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const timerLabelRef = useRef<HTMLSpanElement>(null);
  const elapsedTime = useRef<number>(0);
  const totalElapsedTime = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  const isCorrect = useMemo(() => result.includes("정답"), [result]);
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

  useEffect(() => {
    if (showRecipe && isCorrect) {
      setShowConfetti(true);
    }
  }, [showRecipe, isCorrect]);

  useEffect(() => {
    if (showRecipe && isCorrect) {
      setShowShine(true);
      const timer = setTimeout(() => {
        setShowShine(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showRecipe, isCorrect]);

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
      const userAnswer = inputRef.current?.value || "";
      const result = await generateRecipe(quizes[progress - 1].recipe, userAnswer);
      const finalResult = result || "채점 결과를 불러오지 못했습니다.";
      setResult(finalResult);

      setQuizResults((prev) => [
        ...prev,
        {
          recipe: quizes[progress - 1].recipe,
          userAnswer,
          result: finalResult,
          imageUrl: quizes[progress - 1].image_url,
          name: quizes[progress - 1].name,
        },
      ]);
    } catch {
      setResult("채점 결과를 불러오지 못했습니다. (오류)");
    } finally {
      setLoading(false);
      setShowRecipe(true);
    }
  }

  async function handleNextQuiz() {
    if (progress === quizes.length) {
      setIsFinished(true);
      const comment = await commentOnResult(quizResults.map((result) => result.result));
      setComment(comment || "good job!");
    } else {
      setProgress((prev) => prev + 1);
      setShowRecipe(false);
      setShowConfetti(false);
      setShowShine(false);
      setResult("");
      restartTimer();
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  const correctCount = useMemo(
    () => quizResults.filter((result) => result.result.includes("정답")).length,
    [quizResults],
  );

  const progressColor = useMemo(() => {
    const ratio = correctCount / quizes.length;
    const hue = ratio * 120; // 0: 빨강, 120: 초록
    return `hsl(${hue}, 70%, 50%)`;
  }, [correctCount, quizes.length]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {showConfetti && <Confetti className="w-dvw h-dvh" recycle={false} />}
      <div className="w-[50%] flex items-center gap-2">
        <LinearProgress variant="determinate" value={(progress / quizes.length) * 100} sx={{ flex: 1 }} />
        <Typography variant="body2">
          {progress} / {quizes.length}
        </Typography>
      </div>
      <Card
        sx={{
          width: "100%",
          maxWidth: "1000px",
          position: "relative",
          overflow: "hidden",
          animation: showRecipe && !isCorrect ? "shake 0.5s, redFlash 0.5s" : "none",
          "@keyframes shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
            "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
          },
          "@keyframes redFlash": {
            "0%, 100%": { backgroundColor: "white" },
            "50%": { backgroundColor: "#ffebee" },
          },
        }}
      >
        {showShine && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200%",
              height: "200%",
              background: "linear-gradient(45deg, transparent 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%)",
              animation: "shine 1s ease-in-out",
              transform: "translate(-50%, -50%) rotate(45deg)",
              zIndex: 1,
            }}
          />
        )}
        <style>
          {`
            @keyframes shine {
              0% {
                transform: translate(-100%, -100%) rotate(45deg);
              }
              100% {
                transform: translate(50%, 50%) rotate(45deg);
              }
            }
          `}
        </style>
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
                  sx={{ fontWeight: "600", color: isCorrect ? "#399" : "#933" }}
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
              <div className="w-full flex justify-center gap-2 mt-2">
                <Button variant="contained" onClick={() => setShowResultDialog(true)}>
                  자세한 채점 결과 보기
                </Button>
                <Button variant="contained" onClick={() => onFinish()}>
                  종료
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Dialog
        open={showResultDialog}
        onClose={() => setShowResultDialog(false)}
        maxWidth="md"
        fullWidth
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <DialogTitle className="flex justify-center items-center flex-col gap-2">
          <Typography
            variant="h4"
            fontWeight="bold"
            className="px-4 py-2 rounded-md text-gray-50"
            sx={{ backgroundColor: progressColor }}
          >
            {correctCount} / {quizes.length}
          </Typography>
          <div className="w-full flex justify-center items-center border border-gray-300 rounded-md px-4 py-2 bg-gray-50 ">
            <Typography variant="body1" fontWeight="bold" sx={{ color: "#444" }}>
              {comment}
            </Typography>
          </div>
        </DialogTitle>
        <DialogContent className="flex flex-col">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full overflow-y-auto">
              {quizResults.map(
                (quiz, index) =>
                  !quiz.result.includes("정답") && (
                    <div key={index} className="flex gap-4 mb-4 p-4 border rounded">
                      <div className="w-32 h-32">
                        <CardMedia
                          component="img"
                          image={selectMenuImage(quiz.imageUrl)}
                          alt={quiz.name}
                          className="w-full h-full object-contain rounded-xs"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <Typography variant="h6">{quiz.name}</Typography>
                        <div className="pt-3 pb-2 px-2 border rounded-md bg-gray-50 relative mb-1">
                          <span className="absolute left-4 -top-2 text-xs font-bold bg-white rounded-full text-gray-700">
                            정답 레시피
                          </span>
                          <Typography variant="body2">{quiz.recipe}</Typography>
                        </div>
                        <div className="pt-3 pb-2 px-2 border rounded-md bg-gray-50 relative">
                          <span className="absolute left-4 -top-2 text-xs font-bold bg-white rounded-full text-gray-700">
                            입력
                          </span>
                          <Typography variant="body2" color="warning">
                            {quiz.userAnswer}
                          </Typography>
                        </div>
                        <Typography variant="body2" color="error">
                          {quiz.result}
                        </Typography>
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setShowResultDialog(false)}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
