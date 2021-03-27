const express = require('express');
const app = express();
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
    res.json({items: ['a', 'z', 'c']});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});