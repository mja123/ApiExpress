'use strict';

const { productTable, productSchema } = require('./../src/db/models/product_model');
const { categoryTable, categorySchema } = require('./../src/db/models/category_model');

module.exports = {
  up: async (queryInterface) => {

    await queryInterface.createTable(categoryTable, categorySchema);
    await queryInterface.createTable(productTable, productSchema);
    

  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(categoryTable);
    await queryInterface.dropTable(productTable);
    
  }
};

