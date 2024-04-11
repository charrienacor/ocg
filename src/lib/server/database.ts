import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: "8080",
  user: "root",
  password: "",
  database: "PatnubayAguhon",
  multipleStatements: true,
});

export default pool;
