import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { MongoClient, ObjectId } from "mongodb";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/admin/login");

  const data = await db.collection("BIS").find().toArray();
  return {
    students: data.map((d) => ({
      ...d,
      _id: d._id.toString(),
    })),

    name: event.locals.user.username,
    email: event.locals.user.email,
  };
};
