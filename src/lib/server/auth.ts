import { Lucia, TimeSpan } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";
import { dev } from "$app/environment";
import { Google } from "arctic";
import {
  env
} from "$env/dynamic/private";
import db from "$db/mongo";

let callback_student_route = "";
let callback_admin_route = "";
let callback_visitor_route = "";

if (dev) {
  callback_student_route = env.GOOGLE_CALLBACK_DEV_STUDENT;
  callback_admin_route = env.GOOGLE_CALLBACK_DEV_ADMIN;
  callback_visitor_route = env.GOOGLE_CALLBACK_DEV_VISITOR;
} else {
  callback_student_route = env.GOOGLE_CALLBACK_STUDENT;
  callback_admin_route = env.GOOGLE_CALLBACK_ADMIN;
  callback_visitor_route = env.GOOGLE_CALLBACK_VISITOR;
}

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
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  callback_student_route,
);

export const google1 = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  callback_admin_route,
);


export const google2 = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  callback_visitor_route,
);
