import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://host.docker.internal:27017");
await client.connect();
export default client.db("Aguhon");
