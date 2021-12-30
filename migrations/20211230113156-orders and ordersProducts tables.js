'use strict';

const { orderTable, orderSchema } = require('./../src/db/models/order_model');
const {
  ordersProductsSchema,
  ordersProductsTable,
} = require('./../src/db/models/orders_products_model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(orderTable, orderSchema);
    await queryInterface.createTable(ordersProductsTable, ordersProductsSchema);

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(orderTable);
    await queryInterface.dropTable(ordersProductsTable);

  },
};
