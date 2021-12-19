const { User, userSchema } = require('./user_model');
const { Product, productSchema } = require('./product_model');
const { Customer, customerSchema } = require('./customer_model');

//the param is the instance of the sequelize (the config of the pg's db)
const setUpModels = (sequelize) => {
  //the constructor receive the schema with all the fields in the table and the config, with all the instructions to build the table.
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
}

module.exports = setUpModels;
