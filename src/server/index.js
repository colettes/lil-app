const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const model = require('./model.js');
import gql from './gql.js';

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const db = new sqlite3.Database('db/app.db');
const port = 3001;

app.use(express.json());

app.use(session({ cookie: { maxAge: 60000 }, secret: '2' }));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

const loadUser = (username, password, done) => {
    done(null, '3b63130f-a49b-4556-9373-2abe2b62dd7a');
};

passport.use(new LocalStrategy(loadUser));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.post('/logout', function(req, res){
    req.logout();
    res.json({});
  });

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

app.post('/graphql', (req, res) => {
    gql(req.body.query, (result) => {
        res.json(result);
    });
});

app.get('/', (req, res) => {
    res.send(req.user);
});

app.get('/me', (req, res) => {
    res.json({id: req.user})
});

app.get('/items', (req, res) => {
    model.getItems(db, req.user, (result) => res.json(result)); //decouples model from express library
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
    model.getFavorites2(db, req.user, (result) => res.json(result));
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