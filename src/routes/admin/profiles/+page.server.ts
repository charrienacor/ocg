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

    const data = form.data;
    await db.collection("Counselors").insertOne({
      _id: `${data.Admin_Email}`,
      First_Name: `${data.First_Name}`,
      Middle_Name: `${data.Middle_Name}`,
      Last_Name: `${data.Last_Name}`,
      RGC: `${data.RGC}`,
      Status: `${data.Status}`,
    });
    return {
      form,
    };
  },
};
