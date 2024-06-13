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
    RGC: "true",
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
])
