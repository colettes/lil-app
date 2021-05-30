const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const model = require('./model.js')

const app = express();
const db = new sqlite3.Database('db/app.db')
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    model.getItems(db, (result) => res.json(result)); //decouples model from express library
});

app.get('/items/:id', (req, res) => {
    model.getItem(req, res, db);
});

app.delete('/items/:id', (req, res) => {
    model.deleteItem(req, res, db);
});

app.post('/items', (req, res) => {
    model.createItem(req, res, db);
});

app.put('/items/:id', (req, res) => {
    model.updateItem(req, res, db);
});

app.put('/items2/:id', (req, res) => {
    model.updateItem2(req, res, db);
});

app.get('/favorites', (req, res) => {
    model.getFavorites(req, res, db);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});