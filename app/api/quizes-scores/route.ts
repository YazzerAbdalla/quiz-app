import { NextResponse } from "next/server";
import { getQuizInfoes } from "../(services)/quizScoreService";

export async function GET() {
  const result = await getQuizInfoes();
  return NextResponse.json(result);
}
