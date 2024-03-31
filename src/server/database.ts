import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Aguhon",
  database: "PatnubayAguhon",
  multipleStatements: true,
});

export default pool;
