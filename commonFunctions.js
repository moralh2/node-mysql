module.exports = {
    checkIfInteger: function (stringInput) {
        return (isNaN(stringInput) === false) && (Number(stringInput) === parseInt(stringInput))
    },
    printProducts: function(results) {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].name + " (" + results[i].department + ") - " +
                "$" + results[i].price.toFixed(2) + " [Qty: " + results[i].stock_quantity + "] " + 
                "{ Sales: $" + results[i].sales.toFixed(2) + " }" )
        }
    },
    returnNames: function(objectList) {
        var nameList = [];
        for (var i = 0; i < objectList.length; i++) {
            nameList.push(objectList[i].name);
        }
        return nameList
    },
    returnProduct: function(results, answer) {
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].name === answer.choice) {
                chosenItem = results[i];
            }
        }
        return chosenItem
    },
    printDepts: function(results) {
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].id + ": " + results[i].name + " - " +
                "[Overhead: " + results[i].overhead.toFixed(2) + "] " +
                "[Sales: " + results[i].total_sales.toFixed(2) + "] " +
                "[Profits: " + results[i].profits.toFixed(2) + "]")
        }
    }
}