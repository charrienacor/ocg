import { z } from "zod";

export const formSchema = z.object({
  Visitor_Name: z
    .string()
    .min(5, { message: "Please input name" })
    .max(100, { message: "Cannot exceed 100 characters." }),
  Visitor_Email: z
    .string()
    .max(100, { message: "Cannot exceed 100 characters." }),
  Contact_Num: z
    .string()
    .max(100, { message: "Cannot exceed 100 characters." }),
  Visitor_Institution: z
    .string()
    .max(100, { message: "Cannot exceed 100 characters." }),
  Guidance_Counselor: z.string(),
  Appointment_Date: z.string(),
  Appointment_Time: z.string(),
  Nature_Of_Concern: z.string().max(1000),
});

export type FormSchema = typeof formSchema;
