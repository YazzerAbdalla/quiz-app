import { MongoClient, MongoClientOptions } from "mongodb";

const url = process.env.NEXT_PUBLIC_DB_URL || "";
const options: MongoClientOptions = {};

if (!url) throw new Error("Please add your Mongo Url to .env.local");

let client = new MongoClient(url, options);

let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global `var` declarations
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("Connected successfully to MongoDB");
        return client;
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB", error);
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("Connected successfully to MongoDB");
      return client;
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
      throw error;
    });
}

export default clientPromise;
