import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/student/login");

  let counselors = db.collection("Counselors").find(
    {
      Status: "Active",
      Suffix: "RGC",
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
    });
    return {
      form,
    };
  },
};
