require("dotenv").config()
var expFunc = require("./commonFunctions")
var keys = require("./keys")
var mysql = require("mysql")
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.db.pw,
    database: "bamazon_DB"
})

connection.connect(function (err) {
    if (err) throw err
    determineCommand()
})

function determineCommand() {
    inquirer
        .prompt({
            name: "choice",
            type: "rawlist",
            choices: ["View Product Sales by Department", "Create New Department"],
            message: "What would you like to do?"
        })
        .then(function (answer) {
            switch (answer.choice) {
                case "View Product Sales by Department":
                    outputByDept()
                    break
                case "Create New Department":
                    addDept()
                    break
                default:
                    console.log("Error selecting supervisor options")
                    break
            }
        })
}

function outputByDept() {
    console.log("--All Product Sales by Department")
    connection.query(
        `SELECT id, d.name, d.overhead, total_sales, (total_sales - d.overhead) as profits 
        FROM departments AS d 
        INNER JOIN (SELECT p.department, SUM(p.sales) AS total_sales FROM products AS p GROUP BY p.department) AS t 
        ON d.name = t.department;`, 
        function (err, res) {
            if (err) throw err
            expFunc.printDepts(res)
            connection.end()
        }
    );
}