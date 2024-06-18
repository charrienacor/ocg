import type { PageServerLoad } from "./$types";
import db from "$db/mongo";
import { redirect } from "sveltekit-flash-message/server";

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

  return { name: event.locals.user.username, email: event.locals.user.email };
};
