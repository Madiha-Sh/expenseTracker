const express = require('express');
const router = express.Router();
// const db = require('../config/db');
const db = require('../db')

const getTransactions = (req, res) => {
    let sql = `SELECT * FROM transactions`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({msg: 'Transactions fetched...', transactions: results});
    })
}

const addTransactions = (req, res) => {
    if(req.body.text && req.body.amount) {
        let query = `INSERT INTO transactions
            (text, amount) VALUES (?, ?);`;
        let text = req.body.text;
        let amount = req.body.amount;
        db.query(query, [text,
        amount], (err, rows) => {
            if (err) throw err;
            console.log("Row inserted with id = "
                + rows.insertId);
        });

        res.status(201).json({
            msg: 'Transaction added',
            transaction: {text, amount}
        })
    }
    else {
        res.status(400).json({
            Error: 'Either text or amount is missing!!'
        })
    }
}

const deleteTransactions = (req, res) => {
    // res.send('Delete Transactions');
    let id = req.params.id;
    let query = `DELETE FROM transactions WHERE id=${id}`;
    db.query(query, (err) => {
        if(err) throw err;
        else {
            res.json({'msg': 'Deleted Transaction'});
        }
    });
}

router
    .route('/')
    .get(getTransactions)
    .post(addTransactions);

router
    .route('/:id')
    .delete(deleteTransactions);

module.exports = router;