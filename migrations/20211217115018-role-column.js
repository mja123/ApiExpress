'use strict';

const { userTable, userSchema } = require('./../src/db/models/user_model')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.addColumn(userTable, 'role', userSchema.role);
  },

  down: async (queryInterface) => {

    await queryInterface.removeColumn(userTable, 'role')
  }
};
