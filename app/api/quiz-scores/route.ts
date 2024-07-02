import { NextRequest, NextResponse } from "next/server";
import {
  getOneQuizInfo,
  postQuizScore,
  putQuizScore,
} from "../(services)/serviceQuizScore";

export async function PATCH(req: NextRequest) {
  try {
    const { email } = await req.json();
    const result = await getOneQuizInfo(email);
    if (!result.data) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status }
      );
    }
    return NextResponse.json(
      { message: { message: result.message, data: result.data } },
      { status: result.status }
    );
  } catch (error: any) {
    console.error("Error fetching quiz info:", error);
    return NextResponse.json(
      { message: "Failed to fetch quiz info", error: error.message },
      { status: 500 }
    );
  }
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

export async function PUT(req: NextResponse) {
  const { email, score } = await req.json();

  const result: any = await putQuizScore({ email, score });
  if (result.message) {
    return NextResponse.json(
      { message: result.message },
      { status: result.status }
    );
  }
  return NextResponse.json({ result });
}
