'use strict';

const { userTable, userSchema } = require('./../src/db/models/user_model');


module.exports = {
  up: async (queryInterface) => {
    //When I run the up migration, the queryInterface is an Squelieze Api that we can create tables, etc.
    // This is important because we can add columns or whatever we want do since an specifict history of the
    // db, like in git using the checkout in a commit
    await queryInterface.createTable(userTable, userSchema)

  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(userTable);

  }
};
