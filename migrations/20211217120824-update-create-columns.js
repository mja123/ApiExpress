'use strict';

const { userTable, userSchema } = require('./../src/db/models/user_model')

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.addColumn(userTable, 'created_at', userSchema.createdAt);
    await queryInterface.addColumn(userTable, 'updated_at', userSchema.updatedAt);
  },

  down: async (queryInterface) => {

    await queryInterface.removeColumn(userTable, 'created_at');
    await queryInterface.removeColumn(userTable, 'updated_at');
  }
};
