require('dotenv');
const { Client } = require('pg');

const dbConnection = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  console.log("POSTGRES.JS, before connected")
  await client.connect();
  console.log("POSTGRES.JS, connected")
  return client;
};

module.exports = dbConnection;
