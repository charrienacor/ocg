import type { PageServerLoad, Actions } from "./$types";
import db from "$db/mongo";
import { redirect } from 'sveltekit-flash-message/server';
import { env } from "$env/dynamic/private";
import ApproveEmail from "$lib/email/ApproveEmail.svelte";
import RejectEmail from "$lib/email/RejectEmail.svelte";
import { render } from 'svelte-email';
import transporter from "$lib/email/email.server";
import { DateFormatter } from "@internationalized/date";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect("/admin/login", { type: 'loggedOut', message: 'You have been logged out' }, event);

  let whitelist = await db.collection("Counselors").findOne({
    _id: `${event.locals.user.email}`,
    Status: { $in: ["Active", "On-leave"] }
  });

  if (!whitelist) redirect("/homepage", { type: 'unauthorizedAccess', message: "You are not authorized to access admin pages." }, event);
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
  approve: async (event) => {
    const data = await event.request.formData();
    const id = data.get('id');
    const table = data.get('table');
    let email = "";
    let name = "";

    try {
      await db.collection(`${table}`).updateOne({ _id: `${id}` }, { $set: { Status: 'Approved' } },);
      let appointment = await db.collection(`${table}`).findOne({ _id: `${id}` },);
      if (table === "Appointments") {
        email = appointment.Student_Email;
        name = appointment.Student_Name;
      } else {
        email = appointment.Visitor_Email;
        name = appointment.Visitor_Name;
      }
      const df = new DateFormatter("en-US", {
        dateStyle: "long",
      });
      let rawdate = new Date(appointment.Appointment_Date);
      let date = df.format(rawdate);
      const emailhtml = render({
        template: ApproveEmail,
        props: {
          name: name,
          date: date,
          time: appointment.Appointment_Time,

        }
      });
      const message = {
        from: env.GOOGLE_EMAIL,
        to: email,
        subject: "Approved Requested Schedule Appointment",
        html: emailhtml
      };

      const sendEmail = async (message) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail(message);

    } catch (e) {
      console.log(e);
      redirect("./appointments", { type: 'somethingWentWrong', message: 'Could not perform action, please try again.' }, event);
    }
    redirect("./appointments", { type: "approvedAppointment", message: "Approval of appointment has been confirmed through email to the sender." }, event);

  },
  rejected: async (event) => {
    const data = await event.request.formData();
    const id = data.get('id');
    const table = data.get('table');
    const reject_remark = data.get('reject_remark');
    let email = "";
    let name = "";
    try {
      await db.collection(`${table}`).updateOne({ _id: `${id}` }, { $set: { Status: 'Rejected', Denial_Remark: `${reject_remark}` } },);
      let appointment = await db.collection(`${table}`).findOne({ _id: `${id}` },);
      if (table === "Appointments") {
        email = appointment.Student_Email;
        name = appointment.Student_Name;
      } else {
        email = appointment.Visitor_Email;
        name = appointment.Visitor_Name;
      }
      const df = new DateFormatter("en-US", {
        dateStyle: "long",
      });
      let rawdate = new Date(appointment.Appointment_Date);
      let date = df.format(rawdate);
      const emailhtml = render({
        template: RejectEmail,
        props: {
          name: name,
          date: date,
          time: appointment.Appointment_Time,
          remark: reject_remark,

        }
      });
      const message = {
        from: env.GOOGLE_EMAIL,
        to: email,
        subject: "Rejected Requested Schedule Appointment",
        html: emailhtml
      };

      const sendEmail = async (message) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail(message);
    } catch (e) {
      redirect("./appointments", { type: 'somethingWentWrong', message: 'Could not perform action, please try again.' }, event);
    }
    redirect("./appointments", { type: 'rejectedAppointment', message: `Appointment has been rejected with the following remark: "${reject_remark}"` }, event);
  },
  delete: async (event) => {
    const data = await event.request.formData();
    const id = data.get('id');
    const table = data.get('table');
    try {
      await db.collection(`${table}`).deleteOne({ _id: `${id}` },);
    } catch (e) {
      redirect("./appointments", { type: 'somethingWentWrong', message: 'Could not perform action, please try again.' }, event);
    }
    redirect("./appointments", { type: 'deletedAppointment', message: 'Appointment has been deleted from records.' }, event);
  },
};
