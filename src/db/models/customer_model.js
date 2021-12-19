const { Model, DataTypes } = require('sequelize');

const customerTable = 'customers';

const customerSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
};

class Customer extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: customerTable,
      modelName: 'Customer',
      timestamps: true,
    };
  }
}
module.exports = { customerTable, customerSchema, Customer };