import { z } from "zod";

export const formSchema = z.object({
  // Preliminaries
  Semester: z.string().refine((value) => value !== "", {
    message: "Please select a semester.",
  }),

  School_Year: z
    .string()
    .regex(/[0-9]+[0-9]/, { message: "Only numbers or hyphen allowed." })
    .max(9, { message: "Must be 9 digits" }),

  Student_ID: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(9, { message: "Must be 9 digits" }),

  Degree_Program: z.string().refine((value) => value !== "", {
    message: "Please select a course/degree program.",
  }),

  // Personal Information
  Student_Name: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(100),

  Birth_Date: z
    .string()
    .refine((v) => v, { message: "An appointment date is required." }),

  // Family Data

  // Children in the Familly

  // Educational Background

  // Financial Information

  // Vocational Plans

  // Leisure Time Activities
  Recreational_Activities: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(200),

  Clubs_Joined: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(200),

  Clubs_To_Join: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(200),

  Interests: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(200),

  Reading: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(200),

  // Closing Question
  Dreams: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(500),
});

export type FormSchema = typeof formSchema;
