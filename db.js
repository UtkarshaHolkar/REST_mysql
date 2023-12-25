const mysql = require('mysql');

const connection = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "root123",
   database: "Hotwax"
})

connection.connect((error) =>{
    if(error) throw error;


    console.log("Connection sucesfull");
})

module.exports = connection;