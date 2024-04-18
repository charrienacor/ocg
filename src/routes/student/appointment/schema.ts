import { z } from "zod";

export const formSchema = z.object({
  Student_Name: z.string(),
  Student_Email: z.string(),
  Student_ID: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(9, { message: "Must be 9 digits." })
    .min(9, { message: "Must be 9 digits." }),

  Guidance_Counselor: z.string(),

  Appointment_Date: z.string(),
  Appointment_Hour: z.string(),
  Appointment_Minute: z.string(),

  Nature_Of_Concern: z.string().max(1000),
});

export type FormSchema = typeof formSchema;
