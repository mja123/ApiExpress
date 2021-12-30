'use strict';

const { orderSchema, orderTable } = require('./../src/db/models/order_model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(orderTable, orderSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(orderTable);
  }
};
