import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  let appointments = db.collection("Appointments").find({});
  let v_appointments = db.collection("Visitor_Appointments").find({});
  let counselors = db.collection("Counselors").find(
    {
      Status: "Active",
      RGC: "true",
    },
  );
  return { appointment: await appointments.toArray(), v_appointment: await v_appointments.toArray(), counselor: await counselors.toArray(), };
};

export const actions: Actions = {
  approve: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const table = data.get('table');
    await db.collection(`${table}`).updateOne({ _id: `${id}` }, { $set: { Status: 'Approved' } },);
    redirect(302, "./appointments");

  },
  rejected: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const table = data.get('table');
    const reject_remark = data.get('reject_remark');
    await db.collection(`${table}`).updateOne({ _id: `${id}` }, { $set: { Status: 'Rejected', Denial_Remark: `${reject_remark}` } },);
    redirect(302, "./appointments");
  },
};
