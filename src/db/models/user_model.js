const { Model, DataTypes, Sequelize } = require('sequelize');

const userTable = 'users';

//adding table's fields with their properties
const userSchema = {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  }
};

//Extends Model to get all the queries, Model is the representation of the table in the db
class User extends Model {
  static associate() {

  }
  //receive the connection of the db (sequelize.js), return the connection, the table's name (in the db),
  // and the name of the table in the ORM, that is the identifier we'll use to query the table.
  static config(sequelize) {
    return {
      sequelize,
      tableName: userTable,
      modelName: 'User',
      timestamps: true,
    }
  }
}

module.exports = { userTable, userSchema, User };

/*
TODO: fix the userSchema in the validations, review the UserSchema in the dbModels because when I do a request the server response me with
the error: Cannot read property 'User' of undefined. Then, I need remove the comments in the Schema, usersRoute and the userService. The
lastone task is complete the others models and schemas in the ORM with the rest of the entities
*/
