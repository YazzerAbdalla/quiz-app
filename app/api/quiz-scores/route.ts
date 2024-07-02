import { NextRequest, NextResponse } from "next/server";
import { getQuizInfoes, postQuizScore } from "../(services)/serviceQuizScore";

export async function GET() {
  const result = await getQuizInfoes();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  try {
    const { email, score } = await req.json();

    if (!email || typeof score !== "number") {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    const data = { email, score };
    const result = await postQuizScore(data);

    if (result.message) {
      return NextResponse.json(
        { message: "This Email already exists!" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: "An unexpected error occurred", error: error.message },
      { status: 500 }
    );
  }
}
