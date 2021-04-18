const express = require('express');
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/app.db')

const uuid = require('uuid');

const port = 3001;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/items', (req, res) => {
    const sql = 'SELECT * FROM items LIMIT 10';
    db.all(sql, (error, items) => {
        if (error) throw error;
        const sql2 = 'SELECT * FROM favorites';
        db.all(sql2, (error, favorites) => {
            if (error) throw error;
            const newItems = items.map( (item) => {
                const favorite = favorites.find( (favorite) => favorite.item_id === item.id);
                const favorited = Boolean(favorite);
                return Object.assign({}, item, {favorited});
            });
            const result = {items: newItems};
            res.json(result);
        });
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

app.post('/items', (req, res) => {
    const id = uuid.v4();
    const params = {$id: id, $title: req.body.title, $description: req.body.description, $url: req.body.url};
    const sql = "INSERT INTO items (id, title, description, image_url) VALUES ($id, $title, $description, $url)";
    db.run(sql, params, function(error) {
        if (error) throw error;
        res.json({params})
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});