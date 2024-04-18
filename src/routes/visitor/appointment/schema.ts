import { z } from "zod";

export const formSchema = z.object({
  Visitor_Name: z.string(),
  Visitor_Email: z.string(),
  Guidance_Counselor: z.string(),
  Appointment_Date: z.string(),
  Appointment_Hour: z.string(),
  Appointment_Minute: z.string(),
  Nature_Of_Concern: z.string().max(1000),
});

export type FormSchema = typeof formSchema;
