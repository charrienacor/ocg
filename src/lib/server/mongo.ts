import { MongoClient } from "mongodb";
import { dev } from "$app/environment";
import {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOSTNAME,
  DATABASE_PORT,
} from "$env/static/private";
let connection_string = "";
if (!dev) {
  connection_string = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOSTNAME}:${DATABASE_PORT}`;
} else {
  connection_string = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}`;
}
export const client = new MongoClient(connection_string);
export default client.db("Aguhon");
