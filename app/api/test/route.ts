import { NextResponse } from "next/server";
import { getMovies } from "../(services)/movies";

export async function GET() {
  const result = await getMovies();
  return NextResponse.json(result);
}
