import { MongoClient } from "mongodb";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
let connection_string = "";
if (!dev) {
  connection_string = `mongodb://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOSTNAME}:${env.DATABASE_PORT}`;
} else {
  connection_string = `mongodb://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@localhost:${env.DATABASE_PORT}`;
}
export const client = new MongoClient(connection_string);
export default client.db("Aguhon");
