import { redirect } from "sveltekit-flash-message/server";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user)
    redirect(
      "/admin/login",
      { type: "loggedOut", message: "You have been logged out" },
      event,
    );

  let whitelist = await db.collection("Counselors").findOne({
    _id: `${event.locals.user.email}`,
    Status: { $in: ["Active", "On-leave"] },
  });

  if (!whitelist)
    redirect(
      "/homepage",
      {
        type: "unauthorizedAccess",
        message: "You are not authorized to access admin pages.",
      },
      event,
    );

  let counselors = db.collection("Counselors").find();

  return {
    counselor: await counselors.toArray(),
    form: await superValidate(zod(formSchema)),
  };
};

export const actions: Actions = {
  add: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const data = form.data;
    try {
      await db.collection("Counselors").insertOne({
        _id: `${data.Admin_Email}`,
        First_Name: `${data.First_Name}`,
        Middle_Name: `${data.Middle_Name}`,
        Last_Name: `${data.Last_Name}`,
        RGC: `${data.RGC}`,
        Status: `${data.Status}`,
      });
    } catch (e) {
      redirect(
        "./profiles",
        {
          type: "somethingWentWrong",
          message: "Admin profile was not added to records, please try again.",
        },
        event,
      );
    }
    redirect(
      "./profiles",
      { type: "addedAccount", message: "Admin profile was added to records." },
      event,
    );
    return {
      form,
    };
  },
  status: async (event) => {
    const data = await event.request.formData();
    const id = data.get("id");
    const table = data.get("table");
    const status = data.get("status");
    try {
      await db
        .collection(`${table}`)
        .updateOne({ _id: `${id}` }, { $set: { Status: `${status}` } });
    } catch (e) {
      redirect(
        "./profiles",
        {
          type: "somethingWentWrong",
          message: "Action could not be performed.",
        },
        event,
      );
    }
    redirect(
      "./profiles",
      {
        type: `${status}Admin`,
        message: `Admin profile has been set to ${status} status.`,
      },
      event,
    );
  },
  delete: async (event) => {
    const data = await event.request.formData();
    const id = data.get("id");
    const table = data.get("table");
    try {
      await db.collection(`${table}`).deleteOne({ _id: `${id}` });
    } catch (e) {
      redirect(
        "./profiles",
        {
          type: "somethingWentWrong",
          message: "Could not delete admin profile.",
        },
        event,
      );
    }
    redirect(
      "./profiles",
      {
        type: "deletedAdmin",
        message: "Admin profile has been deleted from records",
      },
      event,
    );
  },
};
