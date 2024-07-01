import { NextRequest, NextResponse } from "next/server";
import { getQuizInfoes, postQuizScore } from "../(services)/quizScoreService";
import QuizScoresProp from "@/types/score";

export async function GET() {
  const result = await getQuizInfoes();
  return NextResponse.json(result);
}
export async function POST(req: NextRequest) {
  const { email, score } = await req.json();
  const data = { email, score };
  const result = await postQuizScore(data);
  if (result.message) return NextResponse.json(result, { status: 400 });
  return NextResponse.json(result);
}
