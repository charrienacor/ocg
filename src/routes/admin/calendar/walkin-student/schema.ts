import { z } from "zod";

export const formSchema = z.object({
  Student_Name: z.string().max(100, { message: "Cannot exceed 100 characters" }),
  Student_Email: z.string().email({ message: "Must input valid email" }).max(100, { message: "Cannot esceed 100 characters" }),
  Student_ID: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(9, { message: "Must be 9 digits." })
    .min(9, { message: "Must be 9 digits." }),
  Contact_Number: z.string()
    .max(100, { message: "Cannot exceed 100 characters" }),
  College: z.string().max(100),
  Course: z.string().max(100),

  Guidance_Counselor: z.string(),

  Appointment_Date: z.string(),
  Appointment_Time: z.string(),

  Nature_Of_Concern: z.string().max(1000),
});

export type FormSchema = typeof formSchema;
