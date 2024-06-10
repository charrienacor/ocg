import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/student/login");


  const existingBIS:any = await db.collection("BIS").findOne({_id:event.params.id})
  if (!existingBIS) redirect(302, "/admin/records");



  return {
    name: event.locals.user.username,
    email: event.locals.user.email,
    form: await superValidate(existingBIS,zod(formSchema),{errors: false}),
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

    await db.collection("BIS").updateOne({
      
      _id:event.params.id, 
    }, {
      $set:data
    });
    return {
      form,
    };
  },
};
