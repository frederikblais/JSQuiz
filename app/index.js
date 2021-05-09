const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
var url = 'mongodb+srv://fblais:admin@jsquizcluster.cpjo9.mongodb.net/quiz-database?retryWrites=true&w=majority';

const db = mongoose.connection;
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());                         

app.use(express.json());
app.use('/',express.static(__dirname + '/public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

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
    quiz_title: {
        type: String,
        required: true
    },
    quiz_category: String,
    tried: Number,
    question1: String,
    question2: String,
    question3: String,
    goodAnswer1: String,
    goodAnswer2: String,
    goodAnswer3: String,
    badAnswer1: String,
    badAnswer11: String,
    badAnswer2: String,
    badAnswer22: String,
    badAnswer3: String,
    badAnswer33: String
});

// Create model
let questionModel = mongoose.model('question', questionSchema);

// UPLOAD |----
app.post('/upload-quiz-title', (req, res) => {
    let question = new questionModel(req.body);

    question.save().then(() => {
        console.log(`Saved ${question.quiz_title} |-------`);
        questionModel.find().then(doc => {
            res.render('../public/views/index', {'questions': doc });
        });
    });
});

// Search |----
app.post('/getQuiz', (req, res) => {
    console.info("Search questionModel with title : "  + req.body.quiz_title)
    questionModel.findOne({
        quiz_title: req.body.quiz_title // search query
    }).then(doc => {
        if(doc != null){
            res.render('../public/views/quiz', doc);
            //res.send(`Title : ${doc.quiz_title}`);
        }else{
            res.send(`No quiz found`);
        }
    });
 });

// INDEX |----
app.get('/', (req, res) => {
    questionModel.find().then(doc => {
        res.render('../public/views/index', {'questions': doc });
    });
});

// CREATE |----
app.get('/create', (req, res) =>
    res.render('../public/views/create')
);

app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log(`Your server is running on ${PORT}...`);
    console.log("------------------------------------------");
});
 
