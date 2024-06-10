import { z } from "zod";

export const formSchema = z.object({

  // // Preliminaries

  Semester: z
    .string(),

  School_Year: z
    .string(),

  Student_Number: z
    .string(),

  Degree_Program: z
    .string(),

  College: z
    .string(),
  
  // // Personal Information

  Student_Name: z
    .string(),

  Nickname: z
    .string(),

  Student_Sex: z
    .string(),

  Student_Age: z
    .string(),

  Birth_Date: z
    .string(),

  Place_Of_Birth: z
    .string(),

  Nationality: z
    .string(),

  Citizenship: z
    .string(),

  Religion: z
    .string(),

  Cellphone_Number: z
    .string(),

  Email_Address: z
    .string(),

  Baguio_Address: z
    .string(),

  Baguio_Telephone_Number: z
    .string(),

  Permanent_Address: z
    .string(),

  Permanent_Telephone_Number: z
    .string(),

  // // Family Data

  Parent_Status: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

  Guardian: z
    .string(),

  Guardian_Address: z
    .string(),

  Guardian_Telephone_Number: z
    .string(),

  Father_Name: z
    .string(),

  Father_Age: z
    .string(),

  Father_Living_Or_Dead: z
    .string(),

  Father_Place_Of_Birth: z
    .string(),

  Father_Address: z
    .string(),

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
    .string(),

  Mother_Living_Or_Dead: z
    .string(),

  Mother_Place_Of_Birth: z
    .string(),

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

  // Children in the Family

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

  JHS_Type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

  Junior_Number_Of_Students: z
    .string(),

  Senior_High_School: z
    .string(),

  Senior_High_School_Location: z
    .string(),

  SHS_Type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

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

  Source_of_Income: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

  Other_Sources_Of_Income: z
    .string(),

  Allowance: z
    .string(),
    
  Source_of_Allowance: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

  Specifics: z
    .string(),

  Second_Other_Sources_Of_Allowance: z
    .string(),

// // Vocational Plans
  
Course: z
    .string(),

  Major: z
    .string(),

  Satisfaction: z
    .string(),

  Yes_Reasons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),
  No_Reasons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

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

  Future_Plans: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one."
  }),

  Other_Future_Plans: z
    .string(),

 // Leisure Time Activities

  Recreational_Activities: z
    .string(),

  Interests: z
    .string(),

  Clubs_Joined: z
    .string(),

  Clubs_To_Join: z
    .string(),

  Reading: z.
    string(),

  YesReading: z
    .string(),

  // Closing Question
  Dreams: z
    .string(),

  Image: z
    .string(),
});

export type FormSchema = typeof formSchema;
