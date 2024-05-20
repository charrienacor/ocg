import { generateId } from "lucia";
import { google, lucia } from "$lib/server/auth";
import db from "$db/mongo";
import { redirect } from 'sveltekit-flash-message/server'

import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");

  const storedState = event.cookies.get("state") ?? null;
  const storedCodeVerifier = event.cookies.get("code_verifier") ?? null;

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
    const response = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const user = await response.json();

    // Replace this with your own DB client.
    const existingUser = await db.collection("users").findOne(
      { google_id: `${user.sub}` },
    );

    if (existingUser !== null) {
      const session = await lucia.createSession(existingUser._id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } else {
      const userId = generateId(15);
      // Replace this with your own DB client.
      await db.collection("users").insertOne({
        _id: `${userId}`,
        google_id: `${user.sub}`,
        username: `${user.name}`,
        email: `${user.email}`,
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    }
  } catch (e) {
    // invalid code
    redirect("/student/login", { type: 'somethingWentWrong', message: 'Log-in failed, please try again.' }, event);
  }
  redirect("/student/dashboard", { type: 'loggedIn', message: 'You have successfully logged in!' }, event);
}

interface user {
  id: number;
  login: string;
}
