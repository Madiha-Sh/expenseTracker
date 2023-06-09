const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({path: '.env'}); 

// Create Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DB,
  });

module.exports = db;