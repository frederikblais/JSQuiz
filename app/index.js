const express = require('express');
const mustacheExpress = require('mustache-express');
const trendingQuiz = require('./data/trending.json');

const app = express();
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
const PORT = 3000;

app.get('/', (req, res) =>
    res.render('index',trendingQuiz)
);

app.get('/create', (req, res) =>
    res.render('create')
);

app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log("Your server is running on port " + PORT);
    console.log("Trending: ",trendingQuiz);
    console.log("------------------------------------------");
});
 
