import { z } from "zod";

export const formSchema = z.object({
  Visitor_Name: z.string().max(100),
  Visitor_Email: z.string(),
  Contact_Num: z.string(),
  Visitor_Institution: z.string(),
  Guidance_Counselor: z.string(),
  Appointment_Date: z.string(),
  Appointment_Time: z.string(),
  Nature_Of_Concern: z.string().max(1000),
});

export type FormSchema = typeof formSchema;
