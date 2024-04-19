import { Lucia, TimeSpan } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";
import { dev } from "$app/environment";
import { Google } from "arctic";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

const client = new MongoClient("mongodb://localhost:27017");
await client.connect();

const db = client.db("Aguhon");

const User = db.collection<UserDoc>("users");
const Session = db.collection<SessionDoc>("sessions");

const adapter = new MongodbAdapter(Session, User);

interface UserDoc {
  _id: string;
  google_id: string;
  username: string;
  email: string;
}

interface SessionDoc {
  _id: string;
  expires_at: Date;
  user_id: string;
}

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(1, "d"),
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
  "http://localhost:5173/student/login/google/callback",
);

export const google1 = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:5173/admin/login/google/callback",
);


export const google2 = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:5173/visitor/login/google/callback",
);
