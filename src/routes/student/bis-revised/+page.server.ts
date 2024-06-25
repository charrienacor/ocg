import { redirect, type RequestHandler } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "$lib/components/bis/schema";
import { zod } from "sveltekit-superforms/adapters";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
  // if (!event.locals.user) redirect(302, "/student/login");

  return {
    // name: event.locals.user.username,
    // email: event.locals.user.email,
    form: await superValidate(zod(formSchema), { errors: false }),
  };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const data = form.data;

    console.log(data);

    // await db.collection("BIS").insertOne({
    //   _id: `${data.Student_Number}`,
    //   ...data,
    // });

    // await db.collection("BIS").insertOne({

    //   _id: `${data.Student_Number}`,

    //   Preliminaries: {
    //     Semester: `${data.Semester}`,
    //     School_Year: `${data.School_Year}`,
    //     Degree_Program: `${data.Degree_Program}`,
    //     College: `${data.College}`,
    //   },

    //    Personal_Information: {
    //     Student_Name: `${data.Student_Name}`,
    //     Nickname: `${data.Nickname}`,
    //     Student_Sex: `${data.Student_Sex}`,
    //     Student_Age: `${data.Student_Age}`,
    //     Birth_Date: `${data.Birth_Date}`,
    //     Place_Of_Birth: `${data.Place_Of_Birth}`,
    //     Nationality: `${data.Nationality}`,
    //     Citizenship: `${data.Citizenship}`,
    //     Religion: `${data.Religion}`,
    //     Cellphone_Number: `${data.Cellphone_Number}`,
    //     Email_Address: `${data.Email_Address}`,
    //     Baguio_Address: `${data.Baguio_Address}`,
    //     Baguio_Telephone_Number: `${data.Baguio_Telephone_Number}`,
    //     Permanent_Address: `${data.Permanent_Address}`,
    //     Permanent_Telephone_Number: `${data.Permanent_Telephone_Number}`,
    //   },

    //   Family_Data: {
    //     Parent_Status: `${data.Parent_Status}`,
    //     Guardian: `${data.Guardian}`,
    //     Guardian_Address: `${data.Guardian_Address}`,
    //     Guardian_Telephone_Number: `${data.Guardian_Telephone_Number}`,
    //     Father_Name: `${data.Father_Name}`,
    //     Father_Age: `${data.Father_Age}`,
    //     Father_Living_Or_Dead: `${data.Father_Living_Or_Dead}`,
    //     Father_Place_Of_Birth: `${data.Father_Place_Of_Birth}`,
    //     Father_Address: `${data.Father_Address}`,
    //     Father_Contact_Number: `${data.Father_Contact_Number}`,
    //     Father_Religion: `${data.Father_Religion}`,
    //     Father_Occupation: `${data.Father_Occupation}`,
    //     Father_Monthly_Income: `${data.Father_Monthly_Income}`,
    //     Father_Employer_Name: `${data.Father_Employer_Name}`,
    //     Father_Employer_Address: `${data.Father_Employer_Address}`,
    //     Father_Highest_Degree_Completed: `${data.Father_Highest_Degree_Completed}`,
    //     Father_School: `${data.Father_School}`,
    //     Father_Languages: `${data.Father_Languages}`,
    //     Mother_Name: `${data.Mother_Name}`,
    //     Mother_Age: `${data.Mother_Age}`,
    //     Mother_Living_Or_Dead: `${data.Mother_Living_Or_Dead}`,
    //     Mother_Place_Of_Birth: `${data.Mother_Place_Of_Birth}`,
    //     Mother_Address: `${data.Mother_Address}`,
    //     Mother_Contact_Number: `${data.Mother_Contact_Number}`,
    //     Mother_Religion: `${data.Mother_Religion}`,
    //     Mother_Occupation: `${data.Mother_Occupation}`,
    //     Mother_Monthly_Income: `${data.Mother_Monthly_Income}`,
    //     Mother_Employer_Name: `${data.Mother_Employer_Name}`,
    //     Mother_Employer_Address: `${data.Mother_Employer_Address}`,
    //     Mother_Highest_Degree_Completed: `${data.Mother_Highest_Degree_Completed}`,
    //     Mother_School: `${data.Mother_School}`,
    //     Mother_Languages: `${data.Mother_Languages}`,
    //   },

    //   Children_in_the_Family: {
    //     Name: `${data.Name}`,
    //     Sex: `${data.Sex}`,
    //     Age: `${data.Age}`,
    //     Civil_Status: `${data.Civil_Status}`,
    //     Educational_Attainment: `${data.Educational_Attainment}`,
    //     Occupation: `${data.Occupation}`,
    //     Residence: `${data.Residence}`,
    //   },

    //   Educational_Background: {
    //     Elementary_School: `${data.Elementary_School}`,
    //     Elementary_School_Location: `${data.Elementary_School_Location}`,
    //     Junior_High_School: `${data.Junior_High_School}`,
    //     Junior_High_School_Location: `${data.Junior_High_School_Location}`,
    //     JHS_Type: `${data.JHS_Type}`,
    //     Junior_Number_Of_Students: `${data.Junior_Number_Of_Students}`,
    //     Senior_High_School: `${data.Senior_High_School}`,
    //     Senior_High_School_Location: `${data.Senior_High_School_Location}`,
    //     SHS_Type: `${data.SHS_Type}`,
    //     Senior_Number_Of_Students: `${data.Senior_Number_Of_Students}`,
    //     HS_Rank: `${data.HS_Rank}`,
    //     School_Ave: `${data.School_Ave}`,
    //     Honors: `${data.Honors}`,
    //     Awards: `${data.Awards}`,
    //     First_Campus: `${data.First_Campus}`,
    //     First_Campus_Reason: `${data.First_Campus_Reason}`,
    //     Second_Campus: `${data.Second_Campus}`,
    //     Second_Campus_Reason: `${data.Second_Campus_Reason}`,
    //   },

    //   Financial_Information: {
    //     Income: `${data.Income}`,
    //     Source_Of_Income: `${data.Source_Of_Income}`,
    //     Other_Sources: `${data.Other_Sources_Of_Income}`,
    //     Allowance: `${data.Allowance}`,
    //     Source_Of_Allowance: `${data.Source_Of_Allowance}`,
    //     Specifics: `${data.Specifics}`,
    //     Second_Other_Sources_Of_Allowance: `${data.Second_Other_Sources_Of_Allowance}`,
    //   },

    //   Vocational_Plans: {
    //     Course: `${data.Course}`,
    //     Major: `${data.Major}`,
    //     Satisfaction: `${data.Satisfaction}`,
    //     Yes_Reasons: `${data.Yes_Reasons}`,
    //     No_Reasons: `${data.No_Reasons}`,
    //     Other_Course: `${data.Other_Course}`,
    //     Other_Yes_Reasons: `${data.Other_Yes_Reasons}`,
    //     Other_No_Reasons: `${data.Other_No_Reasons}`,
    //     Finish_In_UPB: `${data.Finish_In_UPB}`,
    //     Second_No_Reasons: `${data.Transfer_Reasons}`,
    //     Future_Plans: `${data.Future_Plans}`,
    //     Other_Future_Plans: `${data.Other_Future_Plans}`,
    //   },

    //   Leisure_Time_Activities: {
    //     Recreational_Activities: `${data.Recreational_Activities}`,
    //     Interests: `${data.Interests}`,
    //     Clubs_Joined: `${data.Clubs_Joined}`,
    //     Clubs_To_Join: `${data.Clubs_To_Join}`,
    //     Reading: `${data.Reading}`,
    //     YesReading: `${data.YesReading}`,
    //   },

    //   Closing_Question: {
    //     Dreams: `${data.Dreams}`,
    //   }

    // });
    return {
      form,
    };
  },
};
