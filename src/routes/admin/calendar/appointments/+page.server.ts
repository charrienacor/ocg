import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import db from "$db/mongo";


export const load: PageServerLoad = async (event) => {
  let appointments = db.collection("Appointments").find({});
  let v_appointments = db.collection("Visitor_Appointments").find({});
  return { appointment: await appointments.toArray(), v_appointment: await v_appointments.toArray(), };
};

export const actions: Actions = {
  approve: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    console.log(id);
  },
};
