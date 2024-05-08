import type { PageServerLoad, Actions } from "./$types";
import db from "$db/mongo"
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
  let appointment = await db.collection("Visitor_Appointments").findOne({ _id: params.id },);
  let counselor = db.collection("Counselors").findOne({ _id: appointment.Counselor });
  return { appointments: appointment, counselors: await counselor };
};

export const actions: Actions = {
  remark: async ({ request, params }) => {
    const data = await request.formData();
    const remark = data.get('session_remarks');
    await db.collection(`Appointments`).updateOne({ _id: `${params.id}` }, { $set: { Session_Remarks: `${remark}` } },);
    redirect(302, "../");
  },
};

