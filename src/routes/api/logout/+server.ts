import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  if (!event.locals.session) {
    return new Response(null, {
      status: 400,
    });
  }
  await lucia.invalidateSession(event.locals.session.id);
  await lucia.deleteExpiredSessions();
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes,
  });
  redirect(302, "/homepage");
}
