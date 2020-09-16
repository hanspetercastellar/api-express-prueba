const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.HOST || "localhost",
  user: process.env.USER || "root",
  password: process.env.PASS || "",
  database: process.env.DATABASE || "sakila",
});

con.connect((error) => {
  if (error) {
    console.log("cagada");
  }
  console.log("Connectado a la base de datoss");
});

module.exports = con;
