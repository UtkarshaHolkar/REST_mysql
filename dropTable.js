const mysql = require("mysql");
const connection = require("./db");

const dropQuery = "DROP TABLE ";

connection.query(orderHeaderQuery, (err, res) => {
  if (err) throw err;

  console.log("Query run!");
});
