import { z } from "zod";

export const formSchema = z.object({
  // Preliminaries
  Semester: z
    .string({
      required_error: "Please select a semester",
  }),

  School_Year: z
    .string()
    .regex(/[0-9]+[0-9]/, { message: "Only numbers or hyphen allowed." })
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
//   // Personal Information

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

  // Children in the Familly

  Name_1: z
    .string(),

  Sex_1: z
    .string(),

  Age_1: z
    .string(),

  Civil_Status_1: z
    .string(),

  Educational_Attainment_1: z
    .string(),

  Occupation_1: z
    .string(),

  Residence_1: z
    .string(),

  Name_2: z
    .string(),

  Sex_2: z
    .string(),

  Age_2: z
    .string(),

  Civil_Status_2: z
    .string(),

  Educational_Attainment_2: z
    .string(),

  Occupation_2: z
    .string(),

  Residence_2: z
    .string(),

  Name_3: z
    .string(),

  Sex_3: z
    .string(),

  Age_3: z
    .string(),

  Civil_Status_3: z
    .string(),

  Educational_Attainment_3: z
    .string(),

  Occupation_3: z
    .string(),

  Residence_3: z
    .string(),

  Name_4: z
    .string(),

  Sex_4: z
    .string(),

  Age_4: z
    .string(),

  Civil_Status_4: z
    .string(),

  Educational_Attainment_4: z
    .string(),

  Occupation_4: z
    .string(),

  Residence_4: z
    .string(),

  Name_5: z
    .string(),

  Sex_5: z
    .string(),

  Age_5: z
    .string(),

  Civil_Status_5: z
    .string(),

  Educational_Attainment_5: z
    .string(),

  Occupation_5: z
    .string(),

  Residence_5: z
    .string(),
  
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
