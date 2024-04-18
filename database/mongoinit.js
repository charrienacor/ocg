
db = new Mongo().getDB("Aguhon");

db.createCollection("Counselors");
db.Counselors.insertMany([
  {
    _id: "lester.ignacio1209@gmail.com",
    First_Name: "Lester",
    Middle_Name: "",
    Last_Name: "Ignacio",
    Suffix: "",
    Status: "Active",
  },
  {
    _id: "langiao@up.edu.ph",
    First_Name: "Liza",
    Middle_Name: "A.",
    Last_Name: "Ngiao",
    Suffix: "RGC",
    Status: "Active",
  },
  {
    _id: "apparcasio@up.edu.ph",
    First_Name: "Aurora",
    Middle_Name: "P.",
    Last_Name: "Parcasio",
    Suffix: "RGC",
    Status: "Active",
  },
  {
    _id: "jetuguinay@up.edu.ph",
    First_Name: "Julie",
    Middle_Name: "E.",
    Last_Name: "Tuguinay",
    Suffix: "RGC",
    Status: "Active",
  },
  {
    _id: "mpticag@up.edu.ph",
    First_Name: "Merjerie",
    Middle_Name: "P.",
    Last_Name: "Ticag",
    Suffix: "",
    Status: "Active",
  },
]);
