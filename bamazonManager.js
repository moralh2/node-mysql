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
            choices: listManagerOptions(),
            message: "What would you like to do?"
        })
        .then(function (answer) {
            switch (answer.choice) {
                case "View Products for Sale":
                    outputAll()
                    break
                case "View Low Inventory":
                    outputLow()
                    break
                case "Add to Inventory":
                    addInventory()
                    break
                case "Add New Product":
                    addProduct()
                    break
                default:
                    console.log("Error selecting manager options")
                    break
            }
        })
}

function listManagerOptions() {
    options = [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ]
    return options
}

function outputAll() {
    console.log("--All Products")
    connection.query(`SELECT * FROM products`, function (err, res) {
        if (err) throw err
        expFunc.printProducts(res)
        connection.end()
    });
}

function outputLow() {
    console.log("--Products Low on Inventory")
    connection.query(`SELECT * FROM products WHERE stock_quantity <= 5`, function (err, res) {
        if (err) throw err
        expFunc.printProducts(res)
        connection.end()
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: expFunc.returnNames(results),
                    message: "Which item would you like to add stock to?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many items are you adding?",
                    validate: function (value) {
                        return expFunc.checkIfInteger(value)
                    }
                }
            ])
            .then(function (answer) {
                var chosenItem = expFunc.returnProduct(results, answer)
                var userQty = parseInt(answer.quantity)
                var newQuantity = chosenItem.stock_quantity + userQty
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        { stock_quantity: newQuantity },
                        { id: chosenItem.id }
                    ],
                    function (error) {
                        if (error) throw err
                        console.log("You've updated the inventory successfully!")
                        connection.end()
                    }
                )
            })
    })
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the new product?"
            },
            {
                name: "department",
                type: "input",
                message: "What department does the product belong to?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many do we have in stock?",
                validate: function (value) {
                    return expFunc.checkIfInteger(value)
                }
            },
            {
                name: "price",
                type: "input",
                message: "What is the product's cost?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO products SET ?",
                {
                    name: answer.name,
                    department: answer.department,
                    stock_quantity: parseInt(answer.quantity),
                    price: answer.price
                },
                function (err) {
                    if (err) throw err
                    console.log("The new product has been added successfully!")
                    connection.end()
                }
            )
        })
}