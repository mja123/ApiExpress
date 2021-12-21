'use strict';

const { customerTable, customerSchema } = require('./../src/db/models/customer_model');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable(customerTable, customerSchema);

  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(customerTable);
  }
};
