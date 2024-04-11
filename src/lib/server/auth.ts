import { Lucia } from "lucia";
import { Mysql2Adapter } from "@lucia-auth/adapter-mysql";
import mysql from "mysql2/promise";
import { dev } from "$app/environment";
import { Google } from "arctic";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

const pool = mysql.createPool({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "",
  database: "PatnubayAguhon",
  multipleStatements: true,
});

const adapter = new Mysql2Adapter(pool, {
  user: "user",
  session: "user_session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !dev,
    },
  },

  getUserAttributes: (attributes) => {
    return {
      googleId: attributes.google_id,
      username: attributes.username,
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  name: string;
  email: string;
  google_id: number;
  username: string;
}

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:5173/login-student/google/callback",
);
