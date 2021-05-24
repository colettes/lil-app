import uuid from 'uuid';
const userID = '3b63130f-a49b-4556-9373-2abe2b62dd7a';

export const getItems = (db, callback) => {
    const sql = 'SELECT * FROM items LIMIT 10';
    db.all(sql, (error, items) => {
        if (error) throw error;
        const sql2 = 'SELECT * FROM favorites WHERE user_id=$userID';
        const params = { $userID: userID}
        db.all(sql2, params, (error, favorites) => {
            if (error) throw error;
            const newItems = items.map((item) => {
                const favorite = favorites.find((favorite) => favorite.item_id === item.id);
                const favorited = Boolean(favorite);
                return Object.assign({}, item, { favorited });
            });
            const result = { items: newItems };
            callback(result);
        });
    });
}

export const getItem = (req, res, db) => {
    const params = { $id: req.params.id };
    const sql = "SELECT * FROM items WHERE id=$id";
    db.all(sql, params, function (error, items) {
        if (error) throw error;
        const item = items[0]
        res.json({item: item});
    });
}

export const deleteItem = (req, res, db) => {
    const params = { $id: req.params.id };
    const sql = "DELETE FROM items WHERE id=$id";
    db.run(sql, params, function (error) {
        if (error) throw error;
        res.json({ lastID: this.lastID, changes: this.changes })
    });
}

export const createItem = (req, res, db) => {
    const id = uuid.v4();
    const params = {
        $id: id, 
        $title: req.body.title, 
        $description: req.body.description, 
        $url: req.body.url
    };
    const sql = "INSERT INTO items (id, title, description, image_url) VALUES ($id, $title, $description, $url)";
    db.run(sql, params, function(error) {
        if (error) throw error;
        res.json({params});
    });
}

export const updateItem = (req, res, db) => {
    const { favorited } = req.body;
    const id = uuid.v4();
    if (favorited) {
        const params = {
            $id: id,
            $user_id: userID,
            $item_id: req.params.id
        };
        const sql = "INSERT INTO favorites (id, user_id, item_id) VALUES ($id, $user_id, $item_id)";
        db.run(sql, params, function(error) {
            if (error && error.code !== 'SQLITE_CONSTRAINT') {
                throw error; 
            }
            res.json({});
        });
    } else {
        const params = {
            $user_id: userID,
            $item_id: req.params.id
        };
        const sql = "DELETE FROM favorites WHERE item_id = $item_id AND user_id = $user_id";
        db.run(sql, params, function(error) {
            if (error) throw error;
            res.json({});
        });
    };
}

export const getFavorites = (req, res, db) => {
    const params = { $user_id: userID }
    const sql = "SELECT * FROM favorites WHERE user_id = $user_id LIMIT 10";
    db.all(sql, params, function(error, favorites) {
        if (error) throw error;
        res.json({favorites});
    });
}
