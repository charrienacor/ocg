import { z } from "zod";


export const formSchema = z.object({
  // Preliminaries

  Semester: z
    .string(),

  School_Year: z
    .string()
    .regex(/[0-9]+[0-9]/, { message: "Only numbers and hyphen allowed." })
    .max(9, { message: "Must be 9 digits" }),

  Student_Number: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(9, { message: "Must be 9 digits" }),

  Degree_Program: z
    .string({
      required_error: "Please select a degree program",
  }),

  College: z
    .string({
      required_error: "Please select a college",
  }),
  
  // Personal Information

  Student_Name: z
    .string()
    .regex(/^[a-zA-Z,\s]+$/, { message: "This is required." })
    .max(100),

  Nickname: z
    .string()
    .regex(/^[a-zA-Z\s]+$/, { message: "This is required." })
    .max(100),

  Student_Sex: z
    .string(),

  Student_Age: z
    .string()
    .regex(/[0-9]/, { message: "Only numbers allowed." })
    .max(2),

  Birth_Date: z
    .string(),

  Place_Of_Birth: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." })
    .max(100),

  Nationality: z
    .string(),

  Citizenship: z
    .string(),

  Religion: z
    .string(),

  Cellphone_Number: z
    .string()
    .regex(/[0-9]/, { message: "This is required." })
    .max(11, { message: "Must be 11 digits" }),

  Email_Address: z
    .string()
    .regex(/^[a-z0-9,@\s.]+$/, { message: "This is required." }),

  Baguio_Address: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." })
    .max(100),

  Baguio_Telephone_Number: z
    .string()
    .regex(/[0-9]+[0-9]/, { message: "Only numbers and hyphen allowed." })
    .max(30),

  Permanent_Address: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." }),

  Permanent_Telephone_Number: z
    .string()
    .regex(/[0-9]+[0-9]/, { message: "Only numbers and hyphen allowed." })
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

  Father_Age: z
    .number({ invalid_type_error: "Age must be a number." }),

  Father_Living_Or_Dead: z
    .string(),

  Father_Place_Of_Birth: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." })
    .max(100),

  Father_Address: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." })
    .max(100),

  Father_Contact_Number: z
    .string(),

  Father_Religion: z
    .string(),

  Father_Occupation: z
    .string(),

  Father_Monthly_Income: z
    .string(),

  Father_Employer_Name: z
    .string(),

  Father_Employer_Address: z
    .string(),

  Father_Highest_Degree_Completed: z
    .string(),

  Father_School: z
    .string(),

  Father_Languages: z
    .string(),

  Mother_Name: z
    .string(),

  Mother_Age: z
    .number({ invalid_type_error: "Age must be a number." }),

  Mother_Living_Or_Dead: z
    .string(),

  Mother_Place_Of_Birth: z
    .string()
    .regex(/^[a-zA-Z0-9,\s.-]+$/, { message: "This is required." })
    .max(100),

  Mother_Address: z
    .string(),

  Mother_Contact_Number: z
    .string(),

  Mother_Religion: z
    .string(),

  Mother_Occupation: z
    .string(),

  Mother_Monthly_Income: z
    .string(),

  Mother_Employer_Name: z
    .string(),

  Mother_Employer_Address: z
    .string(),

  Mother_Highest_Degree_Completed: z
    .string(),

  Mother_School: z
    .string(),

  Mother_Languages: z
    .string(),

  // Children in the Familly

  Name: z.array(z.string()),

  Sex: z.array(z.string()),

  Age: z.array(z.string()),

  Civil_Status: z.array(z.string()),

  Educational_Attainment: z.array(z.string()),

  Occupation: z.array(z.string()),

  Residence: z.array(z.string()),

  
  // Educational Background

  Elementary_School: z
    .string(),

  Elementary_School_Location: z
    .string(),

  Junior_High_School: z
    .string(),

  Junior_High_School_Location: z
    .string(),

  JHS_Type: z
    .string(),

  Junior_Number_Of_Students: z
    .string(),

  Senior_High_School: z
    .string(),

  Senior_High_School_Location: z
    .string(),

  SHS_Type: z
    .string(),

  Senior_Number_Of_Students: z
    .string(),

  HS_Rank: z
    .string(),

  School_Ave: z
    .string(),

  Honors: z
    .string(),

  Awards: z
    .string(),

  First_Campus: z
    .string(),

  First_Campus_Reason: z
    .string(),

  Second_Campus: z
    .string(),

  Second_Campus_Reason: z
    .string(),

  // Financial Information
  Income: z
    .string(),

  Source_Of_Income: z
    .string(),

  Other_Sources_Of_Income: z
    .string(),

  Allowance: z
    .string(),

  Source_Of_Allowance: z
    .string(),

  Specifics: z
    .string(),

  Other_Sources_Of_Allowance: z
    .string(),

  // Vocational Plans
  Course: z
    .string(),

  Major: z
    .string(),

  Satisfaction: z
    .string(),

  Yes_Reasons: z
    .string(),

  No_Reasons: z
    .string(),

  Other_Course: z
    .string(),

  Other_Yes_Reasons: z
    .string(),

  Other_No_Reasons: z
    .string(),

  Finish_In_UPB: z
    .string(),

  Transfer_Reasons: z
    .string(),

  Future_Plans: z
    .string(),

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

  Reading: z.
    string(),

  YesReading: z
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
