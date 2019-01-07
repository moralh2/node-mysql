require("dotenv").config()

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

connection.connect(function (err) {
    if (err) throw err;
    determineCommand();
});

function determineCommand() {

    inquirer
            .prompt({
                name: "choice",
                type: "rawlist",
                choices: listManagerOptions(),
                message: "What would you like to do?"  
            })
            .then(function (answer) {
                // cases for manager optios
                console.log("\nYou Chose\n" + answer.choice)

                // get the information of the chosen item
                // var chosenItem = returnProduct(results, answer)
                // var userQty = parseInt(answer.quantity)
                // // determine if enough in stock
                // if (chosenItem.stock_quantity >= userQty) {
                //     var newQuantity = chosenItem.stock_quantity - userQty
                //     connection.query(
                //         "UPDATE products SET ? WHERE ?",
                //         [
                //             { stock_quantity: newQuantity },
                //             { id: chosenItem.id }
                //         ],
                //         function (error) {
                //             if (error) throw err;
                //             console.log("Your purchase was successful!");
                //             connection.end();
                //         }
                //     );
                // }
                // else {
                //     // if not enough in stock
                //     console.log("We don't have enough in stock...");
                //     connection.end();
                // }
            });



    
    // query the database for all products

    // connection.query("SELECT * FROM products", function (err, results) {
    //     if (err) throw err;
        
    //     // collect list, prompt user to select one
        
    // });
}

function checkIfInteger(stringInput) {
    var checks = (isNaN(stringInput) === false) && ( Number(stringInput) === parseInt(stringInput) )
    return checks
}

function returnNames(objectList) {
    var nameList = [];
    for (var i = 0; i < objectList.length; i++) {
        nameList.push(objectList[i].name);
    }
    return nameList
}

function returnProduct(results, answer) {
    var chosenItem;
    for (var i = 0; i < results.length; i++) {
        if (results[i].name === answer.choice) {
            chosenItem = results[i];
        }
    }
    return chosenItem
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