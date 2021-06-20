const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const model = require('./model.js');
import gql from './gql.js';

const app = express();
const db = new sqlite3.Database('db/app.db');
const port = 3001;

app.use(express.json());

app.post('/graphql', (req, res) => {
    gql(req.body.query, (result) => { 
        res.json(result); 
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    model.getItems(db, (result) => res.json(result)); //decouples model from express library
});

app.get('/items/:id', (req, res) => {
    // model.getItem(req, res, db);
    model.getItem2(db, req.params.id, (result) => res.json(result));
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

app.get('/favorites', (req, res) => {
    model.getFavorites(req, res, db);
});

app.post('/favorites', (req, res) => {
    model.createFavorite(req, res, db);
});

app.delete('/favorites', (req, res) => {
    model.deleteFavorite(req, res, db);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});