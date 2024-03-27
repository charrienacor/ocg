/// Reference:
/// https://firebase.google.com/docs/auth/admin/verify-id-tokens

import { redirect, type RequestHandler } from "@sveltejs/kit";
import * as jose from "jose";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { idToken } = await request.json();

  // we're now authenticated, yay!
  console.log("authenticated!");

  const payload = jose.decodeJwt(idToken);
  const maxAge = (payload.exp! - payload.iat!) * 1000;
  cookies.set("idToken", idToken, { path: "/", maxAge, secure: true });
  redirect(302, "/student-dashboard");
};
