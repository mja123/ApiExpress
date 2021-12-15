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
  logging: console.log,
});

//Here we call to initialize the tables
setUpModels(sequelize);

//This creates the table
sequelize.sync();

const startingConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


module.exports = { sequelize/*, startingConnection*/ };
