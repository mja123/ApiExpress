const { Sequelize, Model, DataTypes } = require('sequelize');
const { customerTable } = require('./customer_model');

const orderTable = 'orders';

const orderSchema = {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "In preparation",
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      console.log(this.items)
      if(this.items) {
        if (this.items.length > 0) {
          return this.items.reduce((total, item) => {
            return total + (item.price * item.OrdersProducts.amount);
          }, 0);
        }
      }
      
      return 0;
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      key: 'id',
      model: customerTable,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrdersProducts,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Order',
      tableName: orderTable,
      timeStamps: false,
    };
  }
}

module.exports = { Order, orderSchema, orderTable };
