import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) redirect(302, "/admin/login");
  return { name: event.locals.user.username, email: event.locals.user.email };
};
