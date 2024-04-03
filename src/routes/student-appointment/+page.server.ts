import { redirect, type RequestHandler } from "@sveltejs/kit";
import * as jose from "jose";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$lib/server/database";

export const load: PageServerLoad = async ({ cookies }) => {
  const idToken = cookies.get("idToken");
  if (!idToken) return {};
  const payload = jose.decodeJwt(idToken);

  const counselors = await db.execute(
    "SELECT * FROM Counselors WHERE Status = 'Active'",
  );

  return {
    picture: payload.picture,
    name: payload.name,
    email: payload.email,
    form: await superValidate(zod(formSchema)),
    counselor: counselors[0],
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
    return {
      form,
    };
  },
};
