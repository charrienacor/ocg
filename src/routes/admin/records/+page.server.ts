import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { MongoClient, ObjectId } from "mongodb";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/admin/login");
  const client = new MongoClient("mongodb://localhost:27017");
	await client.connect();

	const data = await client.db("Aguhon").collection("BIS").find().toArray();
  return{students: data.map(d => ({
    ...d,
    _id: d._id.toString()
  })), 
  
  name: event.locals.user.username, email: event.locals.user.email};
};
