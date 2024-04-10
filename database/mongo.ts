import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export function start_mongo() {
  console.log("Starting mongo...");
  return client.connect();
}

export default client.db();
