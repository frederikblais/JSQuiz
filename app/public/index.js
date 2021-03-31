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
let questionSchema = new mongoose.Schema({
    quiz_name: String,
    category: String,
    tried: Number,
    question_1: String,
    question_2: String,
    question_3: String,
    good_answer_1: String,
    good_answer_2: String,
    good_answer_3: String,
    bad_answer_1: String,
    bad_answer_11: String,
    bad_answer_2: String,
    bad_answer_22: String,
    bad_answer_3: String,
    bad_answer_33: String
});

function post(questionList){
    // create model
    const questionModel = mongoose.model('Question', questionSchema);

    let question = new questionModel({
        quiz_name: questionList[0],
        category: questionList[1],
        tried: questionList[2],
        question_1: questionList[3],
        good_answer: questionList[4],
        bad_answer_1: questionList[5],
        bad_answer_11: questionList[6],
        bad_answer_2: questionList[7],
        bad_answer_22: questionList[8],
        bad_answer_3: questionList[9],
        bad_answer_33: questionList[10]
        })

    // Save the instance
    question.save().then(() => {
        return console.log('question saved'); 
        });
}

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
 
