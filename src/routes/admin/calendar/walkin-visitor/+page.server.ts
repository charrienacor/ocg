import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { DateFormatter } from "@internationalized/date";

let rawdate: Date;
let date = "";
let time = "";

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user)
    redirect(
      "/admin/login",
      { type: "loggedOut", message: "You have been logged out" },
      event,
    );

  let whitelist = await db.collection("Counselors").findOne({
    _id: `${event.locals.user.email}`,
    Status: { $in: ["Active", "On-leave"] },
  });

  if (!whitelist)
    redirect(
      "/homepage",
      {
        type: "unauthorizedAccess",
        message: "You are not authorized to access admin pages.",
      },
      event,
    );

  let counselors = db.collection("Counselors").find({
    Status: "Active",
    RGC: "true",
  });

  let appointments = db
    .collection("Visitor_Appointments")
    .find({ Status: "Approved" })
    .project({
      _id: 0,
      Appointment_Date: 1,
      Appointment_Time: 1,
      Counselor: 1,
    });

  let timeslots = db.collection("TimeSlots").find().project({ _id: 0 });
  return {
    form: await superValidate(zod(formSchema)),
    counselor: await counselors.toArray(),
    appointments: await appointments.toArray(),
    timeslots: await timeslots.toArray(),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    const generateRandomString = (length: number) => {
      let randomString = "";

      for (let i = 0; i < length; i++) {
        randomString +=
          characters[Math.floor(Math.random() * characters.length)];
      }

      return randomString;
    };

    try {
      const data = form.data;
      await db.collection("Visitor_Appointments").insertOne({
        _id: `${generateRandomString(10)}`,
        Visitor_Name: `${data.Visitor_Name}`,
        Visitor_Email: `${data.Visitor_Email}`,
        Contact_Num: `${data.Contact_Num}`,
        Visitor_Institution: `${data.Visitor_Institution}`,
        Counselor: `${data.Guidance_Counselor}`,
        Appointment_Date: `${data.Appointment_Date}`,
        Appointment_Time: `${data.Appointment_Time}`,
        Nature_Of_Concern: `${data.Nature_Of_Concern}`,
        Status: "Pending",
        Denial_Remark: "",
        Session_Remarks: "",
      });
      const df = new DateFormatter("en-US", {
        dateStyle: "long",
      });
      rawdate = new Date(data.Appointment_Date);
      date = df.format(rawdate);
      time = `${data.Appointment_Time}`;
    } catch (e) {
      setFlash(
        {
          type: "appointmentError",
          message: "Please check your input and try again.",
        },
        event,
      );
    }

    redirect(
      "./walkin-visitor",
      {
        type: "appointmentSuccess",
        message: `You have booked an appointment on ${date} at ${time}.`,
      },
      event,
    );

    return {
      form,
    };
  },
};
