const { Sequelize } = require('sequelize');
const setUpModels = require('./../db/models/index_db')
require('dotenv').config();

//saying to the ORM which is the db and where he can find it
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  dialect: 'postgres',
  logging: true,
});

//Here we call to initialize the tables
setUpModels(sequelize);

//This creates the table
sequelize.sync();

module.exports = sequelize;
