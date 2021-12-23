const { Model, DataTypes, Sequelize } = require('sequelize');
const { userTable } = require('./user_model');

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
  //here we need the atribute field: 'user_id' to have the best pratices in db
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      key: 'id',
      model: userTable,
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: 'user',
    });
  }

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
