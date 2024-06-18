import { z } from "zod";

export const formSchema = z.object({
  Admin_Email: z.string(),
  First_Name: z.string(),
  Middle_Name: z.string(),
  Last_Name: z.string(),
  RGC: z.boolean(),
  Status: z.string(),
});

export type FormSchema = typeof formSchema;
