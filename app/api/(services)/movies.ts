import clientPromise from "@/lib/db";
import { MongoClient, Db, Collection, InsertOneResult } from "mongodb";

let client: MongoClient | undefined;
let db: Db | undefined;
let movies: Collection | undefined;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
    movies = db.collection("movies");
  } catch (e) {
    throw new Error("Failed to establish connection to database");
  }
}

(async () => {
  await init();
})();

export async function getMovies() {
  try {
    if (!movies) await init();
    if (!movies) throw new Error("Collection is not initialized");

    const result = await movies
      .find({})
      .limit(20)
      .map((movie) => ({ ...movie, _id: movie._id.toString() }))
      .toArray();

    return { movies: result };
  } catch (e) {
    console.error(e);
    return { error: "Failed to fetch movies!" };
  }
}

export async function postMovie(data: any) {
  try {
    if (!movies) await init();
    if (!movies) throw new Error("Collection is not initialized");

    const newMovie = { ...data };
    const result: InsertOneResult<Document> = await movies.insertOne(newMovie);
    return { message: "Movie added successfully!", result };
  } catch (e) {
    console.error(e);
    return { error: "Failed to post movie!" };
  }
}
