import type { PageServerLoad } from "./$types";
import db from "$db/mongo";

export const load: PageServerLoad = async (event) => {
    let counselors = db.collection("Counselors").find();
  
    return {
      counselor: await counselors.toArray(),
    };
  };