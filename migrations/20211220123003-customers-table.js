'use strict';

const {
  customerTable,
  customerSchema,
} = require('./../src/db/models/customer_model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(customerTable, customerSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(customerTable);
  },
};
