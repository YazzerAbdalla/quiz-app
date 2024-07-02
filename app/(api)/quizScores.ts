import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function postQuizEmail(email: string) {
  try {
    const result = await axios.post(`${url}/quiz-scores`, {
      email,
      score: "0",
    });
    return result;
  } catch (e: any) {
    return e;
  }
}
