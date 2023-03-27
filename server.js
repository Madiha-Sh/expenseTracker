const express = require('express');
const dotenv = require('dotenv');
const transactions = require('./routes/transactions');
const db = require('./config/db');

const app = express();

// connection
db.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
    // var sql = "CREATE TABLE transactions (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(255), amount INT)";
    // db.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table created");
    // });
    // var sql = "DROP TABLE";
    // db.query(sql, function (err, result) {
    //   if (err) throw err;
    //   console.log("Table dropped");
    // });
});

// app.get('/createDB', (req, res) => {
//     const sql = 'CREATE DATABASE expenseTrackerDB';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log('Result', result);
//         res.end('Database created');
//     })
// });

dotenv.config({path: './config/config.env'}); 

// it allows us to use body parser - ex, req.body.any_property
app.use(express.json());

const PORT = process.env.PORT || 5000;

// app.get('/api/v1/transactions', (req, res) => {
//     console.log("hello");
// });
 
app.use('/api/v1/transactions', transactions); 

// app.use('/api/v1/transactions', (req, res) => {
//     res.send('Get Transactions');
// }); 

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`.yellow));