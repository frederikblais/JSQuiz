const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');

const quiz = require('../data/data.json');
const db = mongoose.connection;
const app = express();
const PORT = 3000;

// DATABASE |----
mongoose.connect('mongodb+srv://fblais:admin@jsquizcluster.cpjo9.mongodb.net/quiz-database?retryWrites=true&w=majority',
                {useNewUrlParser:true, useUnifiedTopology:true});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.info('Connected to the Database.');
    console.log("------------------------------------------");
});

// create schema
/*let personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    age: Number
});*/

// create model
//let PersonModel = mongoose.model('Person', personSchema);


// APP |----
app.engine('mustache', mustacheExpress());

app.use(express.json());

app.set('view engine', 'mustache');

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
 
