document.querySelector('button').addEventListener('click', function(e) {
    var questionList = [];

    var quiz_title = document.getElementById('quiz_title').value;
    var quiz_category = document.getElementById('quiz_category').value;

    var question1 = document.getElementById('question1').value;
    var good_answer_1 = document.getElementById('goodAnswer1').value;
    var bad_answer_1 = document.getElementById('badAnswer1').value;
    var bad_answer_11 = document.getElementById('badAnswer11').value;

    var question2 = document.getElementById('question2').value;
    var good_answer_2 = document.getElementById('goodAnswer2').value;
    var bad_answer_2 = document.getElementById('badAnswer2').value;
    var bad_answer_22 = document.getElementById('badAnswer22').value;

    var question3 = document.getElementById('question3').value;
    var good_answer_3 = document.getElementById('goodAnswer3').value;
    var bad_answer_3 = document.getElementById('badAnswer3').value;
    var bad_answer_33 = document.getElementById('badAnswer33').value;

    questionList = [quiz_title,quiz_category,
                    question1,good_answer_1,bad_answer_1,bad_answer_11,
                    question2,good_answer_2,bad_answer_2,bad_answer_22,
                    question3,good_answer_3,bad_answer_3,bad_answer_33];

    return post(questionList);

    });