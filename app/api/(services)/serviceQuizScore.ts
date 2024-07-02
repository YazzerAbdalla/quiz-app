import clientPromise from "@/lib/db";
import QuizScoresProp from "@/types/score";
import { MongoClient, Db, Collection, InsertOneResult } from "mongodb";
import { Eagle_Lake } from "next/font/google";

let client: MongoClient | undefined;
let db: Db | undefined;
let quizInfo: Collection | undefined;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    quizInfo = db.collection("quiz");
  } catch (e) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getQuizInfoes() {
  if (!quizInfo) await init();
  if (!quizInfo) throw new Error("Collection is not initialized");

  const result = await quizInfo.find({}).toArray();
  return { "Quiz scores": result };
}

export async function postQuizScore(data: QuizScoresProp) {
  if (!quizInfo) await init();
  if (!quizInfo) throw new Error("Collection is not initialized");
  const { email } = data;
  const checkEmailExist = await quizInfo.findOne({ email });
  if (checkEmailExist !== null)
    return { message: "This email already exists!" };

  const result: InsertOneResult<Document> = await quizInfo.insertOne({
    ...data,
  });
  return { quiz: "Quiz info added successfuly!", result };
}

export async function putQuizScore(data: QuizScoresProp) {
  if (!quizInfo) await init();
  if (!quizInfo) throw new Error("Collection is not initialized");

  const { email, score } = data;

  try {
    const result = await quizInfo.findOneAndUpdate(
      { email: email.trim() },
      { $set: { score } },
      { returnDocument: "after" }
    );
    console.log("🚀 ~ putQuizScore ~ result:", result);

    if (!result?.email) {
      return { message: "Email not found", status: 500 };
    }

    return result;
  } catch (error: any) {
    return { message: `Failed to update score: ${error.message}`, status: 500 };
  }
}
