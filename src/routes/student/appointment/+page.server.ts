import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { DateFormatter } from "@internationalized/date";
import { GOOGLE_EMAIL } from "$env/static/private";
import { render } from 'svelte-email';
import transporter from "$lib/email/email.server";
import RequestEmail from "$lib/email/RequestEmail.svelte";
import ConfirmationEmail from "$lib/email/ConfirmationEmail.svelte";

let rawdate: Date;
let date = "";
let time = "";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect("/student/login", { type: 'loggedOut', message: 'You have been logged out.' }, event);

  let counselors = db.collection("Counselors").find(
    {
      Status: "Active",
      RGC: "true",
    },
  );

  let appointments = db.collection("Appointments").find(
    { Status: "Accepted" }).project(
      {
        _id: 0,
        Appointment_Date: 1,
        Appointment_Time: 1,
        Counselor: 1,
      });


  let college = db.collection("College").find().project({ _id: 0 });


  return {
    name: event.locals.user.username,
    email: event.locals.user.email,
    form: await superValidate(zod(formSchema)),
    counselor: await counselors.toArray(),
    college: await college.toArray(),
    appointments: await appointments.toArray(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    const generateRandomString = (length: number) => {
      let randomString = "";

      for (let i = 0; i < length; i++) {
        randomString +=
          characters[Math.floor(Math.random() * characters.length)];
      }

      return randomString;
    };
    try {
      const data = form.data;
      await db.collection("Appointments").insertOne({
        _id: `${data.Student_ID}${generateRandomString(3)}`,
        Student_Name: `${data.Student_Name}`,
        Student_Email: `${data.Student_Email}`,
        Student_ID: `${data.Student_ID}`,
        Counselor: `${data.Guidance_Counselor}`,
        Appointment_Date: `${data.Appointment_Date}`,
        Appointment_Time: `${data.Appointment_Hour}:${data.Appointment_Minute}`,
        Nature_Of_Concern: `${data.Nature_Of_Concern}`,
        Status: "Pending",
        Denial_Remark: "",
        Session_Remarks: "",
      });
      const df = new DateFormatter("en-US", {
        dateStyle: "long",
      });
      rawdate = new Date(data.Appointment_Date);
      date = df.format(rawdate);
      time = `${data.Appointment_Hour}:${data.Appointment_Minute}`
      const emailhtml = render({
        template: RequestEmail,
        props: {
          name: data.Student_Name,
          date: date,
          time: time,
          email: data.Student_Email,
          concern: data.Nature_Of_Concern,
        }
      });
      const message = {
        from: GOOGLE_EMAIL,
        to: GOOGLE_EMAIL,
        subject: `New Requested Appointment by Student ${data.Student_Name}`,
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

      const emailhtml1 = render({
        template: ConfirmationEmail,
        props: {
          name: data.Student_Name,
          date: date,
          time: time,
          email: data.Student_Email,
          concern: data.Nature_Of_Concern,
        }
      });
      const message1 = {
        from: GOOGLE_EMAIL,
        to: data.Student_Email,
        subject: `Confirmation of Requested Appointment`,
        html: emailhtml1
      };

      const sendEmail1 = async (message1) => {
        await new Promise((resolve, reject) => {
          transporter.sendMail(message1, (err, info) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(info);
            }
          });
        });
      };

      await sendEmail1(message1);
    } catch (e) {

      setFlash({ type: 'appointmentError', message: 'Please check your input and try again.' }, event);
    }
    redirect("./appointment", {
      type: "appointmentSuccess",
      message: `You have booked an appointment on ${date} at ${time}.`
    }, event);
    return {
      form,
    };
  },
};
