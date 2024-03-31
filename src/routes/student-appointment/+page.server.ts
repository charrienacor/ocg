import { redirect, type RequestHandler } from "@sveltejs/kit";
import * as jose from "jose";
import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async ({ cookies }) => {
    const idToken = cookies.get("idToken");
    if (!idToken) return {};
    const payload = jose.decodeJwt(idToken);
    return { picture: payload.picture, name: payload.name,
    form: await superValidate(zod(formSchema)), };
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