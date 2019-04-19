var inquirer = require("inquirer");
var mysql = require("mysql");



var id_of_product;
var inventory_available;
var cost_of_item;
var quantity_to_purchase;
var item_name;


var connection = mysql.createConnection({
  host: "localhost",
  port: 3360,
  user: "trilogy",
  password: "password1234",
  database: "bAmazon"
});

connection.connect(function(error) {
  if (error) {
    console.error("error when attempting to connect: " + error.stack);
    return;
  }
  productsDisplayed();
});


function productsDisplayed() {
  connection.query("SELECT * FROM products", function(error, data) {
    if (error) {
      console.error("error with SQL: " + error.stack);
      return;
    }
    data.forEach( product => {
      console.log(`${product.id_of_product} - ${product.product_name}, PRICE: $${product.price}`);
    });
    triggerQuestions();
  });
}

function triggerQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the ID of what you would like to purchase. ",
        name: "itemId"
      },
      {
        type: "input",
        message: "Please enter the quantity you would like to purchase. ",
        name: "itemUnits"
      }
    ])
    .then(answer => {
        id_of_product = answer.itemId;
        quantity_to_purchase = answer.itemUnits;
        availability_of_inventory();
    });
}

function doPurchaseItem () {
  connection.query("UPDATE products SET ? WHERE ?",[
      {stock_quantity : inventory_available - quantity_to_purchase},
      {id_of_product : id_of_product}
    ], 
    (error, data) => {
      if (error) {
        console.log("Unable to complete transaction at this time.");
        throw error;
        return;
      }
      console.log(`\nYour item has been purchased. Thank you. `);
      console.log(`\n1. ${item_name} Price: $${cost_of_item} x ${quantity_to_purchase} = $${cost_of_item*quantity_to_purchase}\n`);
      connection.end();
    }
  );


function availability_of_inventory() {
  var ql = connection.query(
    "SELECT stock_quantity,price,product_name FROM products WHERE ?",
    { id_of_product: id_of_product },
    (error, data) => {
        if (error) {
          throw error;
          return;
        }
        inventory_available = +data[0].stock_quantity;
        cost_of_item = +data[0].price;
        item_name = data[0].product_name;
        if (quantity_to_purchase > inventory_available) {
          console.log(`Sorry, but we are currently out of this item, please make another selection.`);
        }else {
          doTransaction();
        }
    }
  );
}
