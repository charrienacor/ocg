import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  let counselors = db.collection("Counselors").find();

  return {
    counselor: await counselors.toArray(),
    form: await superValidate(zod(formSchema)),
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
      Denial_Remark: "",
      Session_Remarks: "",
    });
    return {
      form,
    };
  },
};
