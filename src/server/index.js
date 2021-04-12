const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/app.db')

const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items LIMIT 10';
    db.all(sql, (error, rows) => {
        if (error) throw error;
        const result = {items: rows};
        res.json(result);
    });  
});

app.delete('/items/:id', (req, res) => {
    const params = {$id: req.params.id}
    const sql = "DELETE FROM items WHERE id=$id";
    db.run(sql, params, function(error) {
        if (error) throw error;
        res.json({lastID: this.lastID, changes: this.changes})
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});