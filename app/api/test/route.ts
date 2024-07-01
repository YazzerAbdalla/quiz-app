import { NextRequest, NextResponse } from "next/server";
import { getMovies, postMovie } from "../(services)/movies";

export async function GET() {
  const result = await getMovies();
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const result = await postMovie(data);
  return NextResponse.json(result);
}
