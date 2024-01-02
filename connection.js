require('dotenv').config();


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST || "localhost",
      port : process.env.DB_PORT || 3306,
      user : process.env.DB_USERNAME || "root",
      password : process.env.DB_PASSWORD || "root",
      database : process.env.DB_NAME || "cvHaikalTest"
    }
  });


const connection = {
    host: process.env.DB_HOST,
    port: process.env.PORT
}

module.exports = { connection, knex }
  