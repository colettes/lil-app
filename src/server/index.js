const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/app.db')

const port = 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.all(sql, (error, rows) => {
        if (error) throw error;
        const result = {items: rows};
        res.json(result);
    });
    
    
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});