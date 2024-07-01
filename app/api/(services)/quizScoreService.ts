import clientPromise from "@/lib/db";
import { MongoClient, Db, Collection, InsertOneResult } from "mongodb";

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

  const result = quizInfo.find({}).toArray();
  return result;
}
