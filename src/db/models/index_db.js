const { User, userSchema } = require('./user_model');

//the param is the instance of the sequelize (the config of the pg's db)
const setUpModels = (sequelize) => {
  //the constructor receive the schema with all the fields in the table and the config, with all the instructions to build the table.
  User.init(userSchema, User.config(sequelize));
}

module.exports = setUpModels;
