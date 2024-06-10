import { MongoClient } from "mongodb";
import { dev } from "$app/environment";
import {
  MONGODB_LOCAL,
  MONGODB_PRODUCTION,
} from "$env/static/private";
let connection_string = "";
if (!dev) {
  connection_string = MONGODB_PRODUCTION;
} else {
  connection_string = MONGODB_LOCAL;
}
const client = new MongoClient(connection_string);
await client.connect();
export default client.db("Aguhon");
