import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { google, lucia } from "$lib/server/auth";
import db from "$lib/server/database";

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
    const existingUser = await db.execute(
      `SELECT * FROM user WHERE google_id = ${user.id}`,
    );

    if (existingUser) {
      const session = await lucia.createSession(existingUser[0][0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } else {
      const userId = generateId(15);

      // Replace this with your own DB client.
      await db.execute(
        `INSERT INTO user VALUES (${userId}, ${user.google_id}, ${user.login})`,
      );

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface user {
  id: number;
  login: string;
}
