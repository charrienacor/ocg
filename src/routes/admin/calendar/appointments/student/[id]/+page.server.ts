import type { PageServerLoad, Actions } from "./$types";
import db from "$db/mongo"
import { type RequestHandler } from "@sveltejs/kit";
import { redirect, setFlash } from 'sveltekit-flash-message/server'

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect("/admin/login", { type: 'loggedOut', message: 'You have been logged out' }, event);
  let whitelist = await db.collection("Counselors").findOne({
    _id: `${event.locals.user.email}`,
    Status: { $in: ["Active", "On-leave"] }
  });

  if (!whitelist) redirect("/homepage", { type: 'unauthorizedAccess', message: "You are not authorized to access admin pages." }, event);
  let appointment = await db.collection("Appointments").findOne({ _id: event.params.id },);
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

