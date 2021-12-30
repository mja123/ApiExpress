const { User, userSchema } = require('./user_model');
const { Product, productSchema } = require('./product_model');
const { Customer, customerSchema } = require('./customer_model');
const { Category, categorySchema } = require('./category_model');
const { Order, orderSchema } = require('./order_model');
const {OrdersProducts, ordersProductsSchema } = require('./orders_products_model');

//the param is the instance of the sequelize (the config of the pg's db)
const setUpModels = (sequelize) => {
  //the constructor receive the schema with all the fields in the table and the config, with all the instructions to build the table.
  User.init(userSchema, User.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));
  OrdersProducts.init(ordersProductsSchema, OrdersProducts.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrdersProducts.associate(sequelize.models)
};

module.exports = setUpModels;
