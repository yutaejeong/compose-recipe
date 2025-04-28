"use server";

import { COMMENT_PROMPT, GRADE_PROMPT } from "@/constants/prompt";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_STUDIO_API_KEY,
});

export async function generateRecipe(correct_recipe: string, input_recipe: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: GRADE_PROMPT(correct_recipe, input_recipe),
    config: {
      systemInstruction: "당신은 카페 레시피 테스트를 채점하는 평가자입니다.",
    },
  });
  return response.text;
}

export async function commentOnResult(results: string[]) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: COMMENT_PROMPT(results),
    config: {
      systemInstruction: "당신은 카페 레시피 테스트를 채점하는 평가자입니다.",
    },
  });
  return response.text;
}
