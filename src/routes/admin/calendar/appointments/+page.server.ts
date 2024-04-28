import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  let appointments = db.collection("Appointments").find({});
  let v_appointments = db.collection("Visitor_Appointments").find({});
  return { appointment: await appointments.toArray(), v_appointment: await v_appointments.toArray(), };
};
