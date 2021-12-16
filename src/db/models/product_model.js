const { Model, DataTypes, Sequelize } = require('sequelize');

const productTable = 'products';

const productSchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
}

class Product extends Model {
  static associate() {

  };
  static config(sequelize) {
    return {
      sequelize,
      tableName: productTable,
      modelName: 'Product',
      timeStamps: true,
    }
  }
}

module.exports = {
  Product,
  productSchema,
  productTable
}
