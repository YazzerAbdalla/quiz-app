import axios from "axios";
const url = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function postQuizEmail(email: string) {
  try {
    const result = await axios.post(`${url}/quiz-scores`, {
      email,
      score: 0,
    });
    return result;
  } catch (e: any) {
    return e;
  }
}
export async function editeQuizScore({
  email,
  score,
}: {
  email: string;
  score: number;
}) {
  try {
    const result = await axios.put(`${url}/quiz-scores`, {
      email,
      score,
    });
    return result;
  } catch (e: any) {
    return e;
  }
}

export async function getOneQuizInfo(email: string ) {
  try {
    const result = await axios.patch(`${url}/quiz-scores`, {
      email,
    });
    return result;
  } catch (e: any) {
    return e;
  }
}
