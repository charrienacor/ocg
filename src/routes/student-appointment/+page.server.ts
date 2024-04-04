import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$lib/server/database";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/login-student");
  const counselors = await db.execute(
    "SELECT * FROM Counselors WHERE Status = 'Active'",
  );

  return {
    name: event.locals.user.username,
    email: event.locals.user.email,
    form: await superValidate(zod(formSchema)),
    counselor: counselors[0],
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    console.log(form);
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    return {
      form,
    };
  },
};
