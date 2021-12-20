'use strict';
const { customerTable, customerSchema } = require('./../src/db/models/customer_model')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.addColumn(customerTable, 'created_at', customerSchema.createdAt);
    await queryInterface.addColumn(customerTable, 'updated_at', customerSchema.updatedAt);
  },

  down: async (queryInterface) => {

    await queryInterface.removeColumn(customerTable, 'created_at');
    await queryInterface.removeColumn(customerTable, 'updated_at');
  }
};