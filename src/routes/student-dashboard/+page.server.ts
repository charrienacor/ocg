import { redirect, type RequestHandler } from "@sveltejs/kit";
import * as jose from "jose";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
  const idToken = cookies.get("idToken");
  if (!idToken) return {};
  const payload = jose.decodeJwt(idToken);
  return { picture: payload.picture, name: payload.name, email: payload.email };
};
