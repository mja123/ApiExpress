const { Sequelize, DataTypes, Model } = require('sequelize');

const categoryTable = 'categories';

const categorySchema = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
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
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId',
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Category',
      tableName: categoryTable,
      timeStamps: false,
    };
  }
}

module.exports = { categoryTable, Category , categorySchema};
