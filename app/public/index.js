const express = require('express');
const mustacheExpress = require('mustache-express');
const mongoose = require('mongoose');
const multer = require('multer');

const quiz = require('../data/data.json');
const db = mongoose.connection;
const app = express();
const path = require('path');
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
    question1: String,
    question2: String,
    question3: String,
    goodanswer1: String,
    goodanswer2: String,
    goodanswer3: String,
    badanswer1: String,
    badanswer11: String,
    badanswer2: String,
    badanswer22: String,
    badanswer3: String,
    badanswer33: String
});

app.use('/',express.static(__dirname + '/public'));
app.use('/uploads',express.static(__dirname + '/uploads'));

let questionModel = mongoose.model('question', questionSchema);

const storage = multer.diskStorage({
    //Define where we want to save the uploaded file
    destination: function(req, file, cb) {
    cb(null, 'uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); //here we also append a timestamp to the file name
    }
});

app.post('/upload-quiz-title', (req, res) => {

    let upload = multer({storage: storage}).single('quiz_title');

    //perform the upload
    upload(req, res, function(err) {
        let question = new questionModel(req.body);
        question.save().then(() =>{
            console.log('Saved');
            res.send(`uploaded`)
        });
    });
});

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
 
