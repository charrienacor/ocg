import { z } from "zod";

export const formSchema = z.object({
  Student_ID: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(9, { message: "Must be 9 digits" }),

  Student_Name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed" })
    .max(100),

  Student_Email: z
    .string()
    .email()
    .endsWith("@up.edu.ph", { message: "Only @up.edu.ph domain allowed" })
    .max(30),

  Nature_Of_Concern: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed" })
    .max(1000),
});

export type FormSchema = typeof formSchema;
