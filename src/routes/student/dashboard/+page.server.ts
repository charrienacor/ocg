import { redirect } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    redirect(302, "/student/login", { type: 'loggedOut', message: 'You have been logged out.' }, event)
  };
  return { name: event.locals.user.username, email: event.locals.user.email };
};
