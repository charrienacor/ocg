db = new Mongo().getDB("Aguhon");

db.createCollection("Counselors");
db.Counselors.insertMany([
  {
    _id: "lester.ignacio1209@gmail.com",
    First_Name: "Lester",
    Middle_Name: "",
    Last_Name: "Ignacio",
    RGC: "false",
    Status: "Active",
  },
  {
    _id: "amlopez4@up.edu.ph",
    First_Name: "Alyanna",
    Middle_Name: "",
    Last_Name: "Lopez",
    RGC: "false",
    Status: "Active",
  },
  {
    _id: "langiao@up.edu.ph",
    First_Name: "Liza",
    Middle_Name: "A.",
    Last_Name: "Ngiao",
    RGC: "true",
    Status: "Active",
  },
  {
    _id: "apparcasio@up.edu.ph",
    First_Name: "Aurora",
    Middle_Name: "P.",
    Last_Name: "Parcasio",
    RGC: "true",
    Status: "Active",
  },
  {
    _id: "jetuguinay@up.edu.ph",
    First_Name: "Julie",
    Middle_Name: "E.",
    Last_Name: "Tuguinay",
    RGC: "true",
    Status: "Active",
  },
  {
    _id: "mpticag@up.edu.ph",
    First_Name: "Merjerie",
    Middle_Name: "P.",
    Last_Name: "Ticag",
    RGC: "false",
    Status: "Active",
  },
  {
    _id: "jeherrera@up.edu.ph",
    First_Name: "JK",
    Middle_Name: "",
    Last_Name: "Herrera",
    RGC: "false",
    Status: "Active",
  },
]);

db.createCollection("College");
db.College.insertMany([
  {
    College: "Science",
  },

  {
    College: "Social Science",
  },

  {
    College: "Arts and Communication",
  },
]);

db.createCollection("TimeSlots");
db.TimeSlots.insertMany([
  {
    Email: "langiao@up.edu.ph",
    Monday: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Tuesday: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Wednesday: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Thursday: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Friday: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
  },
  {
    Email: "apparcasio@up.edu.ph",
    Monday: ["8:15 AM", "10:15 AM", "2:15 PM"],
    Tuesday: ["8:15 AM", "10:15 AM", "2:15 PM"],
    Wednesday: ["8:15 AM", "10:15 AM", "2:15 PM"],
    Thursday: ["8:15 AM", "10:15 AM", "2:15 PM"],
    Friday: ["8:15 AM", "10:15 AM", "2:15 PM"],
  },
  {
    Email: "jetuguinay@up.edu.ph",
    Monday: ["8:30 AM", "9:30 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Tuesday: ["8:30 AM", "9:30 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Wednesday: ["8:30 AM", "9:30 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Thursday: ["8:30 AM", "9:30 AM", "10:30 AM", "2:00 PM", "3:30 PM"],
    Friday: ["8:00 AM", "9:30 AM"],
  },
]);
