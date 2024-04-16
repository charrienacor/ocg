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

  Student_Number: z
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

  Nickname: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "Only letters and spaces allowed." })
    .max(100),

  Sex: z
    .string(),

  Age: z
    .string(),
  
  Birth_Date: z
    .string(),

  Place_Of_Birth: z
    .string()
    .max(100),

  Nationality: z
    .string(),

  Citizenship: z
    .string(),

  Religion: z
    .string(),

  Cellphone_Number: z
    .string()
    .max(11),

  Email_Address: z
    .string(),
  
  Baguio_Address: z
    .string()
    .max(100),
  
  Baguio_Telephone_Number: z
    .string()
    .max(30),
  
  Permanent_Address: z
    .string(),

  Permanent_Telephone_Number: z
    .string()
    .max(30),
  
// Family Data

  Parent_Status: z
    .string(),

  Guardian: z
    .string()
    .max(50),

  Guardian_Address: z
    .string()
    .max(100),
  
  Guardian_Telephone_Number: z
    .string()
    .max(30),

  Father_Name: z
    .string(),

  Age: z
  /
  
  
  
  

  




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
