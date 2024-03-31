import { z } from "zod";

export const formSchema = z.object({
  Student_ID: z.coerce
    .number()
    .int()
    .gte(100000000, { message: "Student number must be 9 digits" })
    .lte(999999999, { message: "Student number must be 9 digits" }),

  // Student_ID: z.number().int().gte(9, {message: "Student number must be 9 digits"}).lte(9,{message: "Student number must be 9 digits"}),
});

export type FormSchema = typeof formSchema;
