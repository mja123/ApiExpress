require('dotenv');
const { Client, Pool } = require('pg');

const clientConnection = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  await client.connect();
  return client;
};

const poolStarting =  () => {
  try {
    const pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    })
    return pool;
  } catch(error) {
    throw error.message;
  }
}

module.exports = { clientConnection, poolStarting };
