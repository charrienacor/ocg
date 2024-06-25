import { z } from "zod";

export const formSchema = z.object({
  // // Preliminaries

  Semester: z.string(),

  School_Year: z.string(),

  Student_Number: z.string(),

  Course: z.string(),

  College: z.string(),

});

export type FormSchema = typeof formSchema;
