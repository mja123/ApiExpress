const { Sequelize, Model, DataTypes } = require('sequelize');
const { productTable } = require('./product_model');
const { orderTable } = require('./order_model');

const ordersProductsTable = 'orders_products';

const ordersProductsSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      key: 'id',
      model: productTable,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      key: 'id',
      model: orderTable,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class OrdersProducts extends Model {
  static associate(models) {
    this.belongsTo(models.Order, {
      as: 'order',
    });
    this.belongsTo(models.Product, {
      as: 'product',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'OrdersProducts',
      tableName: ordersProductsTable,
      timeStamps: false,
    };
  }
}

module.exports = { OrdersProducts, ordersProductsSchema, ordersProductsTable };
