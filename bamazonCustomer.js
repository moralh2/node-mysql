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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // afterConnection();
    buyProduct();
});

//   function afterConnection() {
//     connection.query(`SELECT * FROM products`, function(err, res) {
//       if (err) throw err;
//       console.log(res);
//       connection.end();
//     });
//   }

function buyProduct() {
    // query the database for all products
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // collect list, prompt user to select one
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy? (integer)",
                    validate: function (value) {
                        if ((isNaN(value) === false) && (Number(value) === parseInt(value))) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
                var userQty = parseInt(answer.quantity)
                // determine if enough in stock
                if (chosenItem.quantity >= userQty) {
                    var newQuantity = chosenItem.quantity - userQty
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                quantity: newQuantity
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your purchase was successful!");
                            connection.end();
                            // start();
                        }
                        
                    );
                }
                else {
                    // if not enough in stock
                    console.log("We don't have enough in stock...");
                    // start();
                }
            });
    });
}