const express = require('express');
const mustacheExpress = require('mustache-express');
const quiz = require('./data/data.json');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
const PORT = 3000;

app.get('/', (req, res) => {
    res.render('index',quiz);
});

app.get('/create', (req, res) =>
    res.render('create')
);

app.get('/all', (req, res) =>
    res.render('all')
);

app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log("Your server is running on port " + PORT);
    console.log("------------------------------------------");
});
 
