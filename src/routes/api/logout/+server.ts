import { lucia } from "$lib/server/auth";
import { redirect } from "sveltekit-flash-message/server";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  if (!event.locals.user)
    redirect(
      "/homepage",
      { type: "loggedOut", message: "You have been logged out." },
      event,
    );
  await lucia.invalidateSession(event.locals.session.id);
  await lucia.deleteExpiredSessions();
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
  redirect(
    "/homepage",
    { type: "loggedOut", message: "You have been logged out" },
    event,
  );
}
