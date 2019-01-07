require("dotenv").config();
// to save the pw like done in Liri HW

var keys = require("./keys.js")
var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.db.pw,
  database: "bamazon_DB"
});

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });
  
  function afterConnection() {
    connection.query(`SELECT * FROM products`, function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }