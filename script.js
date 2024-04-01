let questions = [
    {
        "question": "how long does it take for the sun's light to reach Earth?",
        "answer_1": "8 minutes",
        "answer_2": "20 minutes",
        "answer_3": "30 minutes",
        "answer_4": "60 minutes",
        "right_answer": 1,
    }, {
        "question": "The concept of gravity was discovered by which famous physicist?",
        "answer_1": "Marie Curie",
        "answer_2": "Galileo Galilei",
        "answer_3": "Isaac Newton",
        "answer_4": "James Clerk Maxwell",
        "right_answer": 3,
    }, {
        "question": "What is the heaviest organ in the human body?",
        "answer_1": "the kidney",
        "answer_2": "The heart",
        "answer_3": "The liver",
        "answer_4": "The lungs",
        "right_answer": 3,
    }, {
        "question": "How many bones are in the human body?",
        "answer_1": 206,
        "answer_2": 380,
        "answer_3": 150,
        "answer_4": 440,
        "right_answer": 1,
    }
];

let rightQuestions = 0;
let currentQuestion = 0;

let audio_right = new Audio('./music/right.mp3');
let audio_wrong = new Audio('./music/wrong.mp3');
let audio_success = new Audio('./music/success.mp3');
let audio_fail = new Audio('./music/fail.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
        endSoundAndPicture();
    } else {
        updateProgressBar()
        goToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    // End screen
    document.getElementById('end-screen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-answers').innerHTML = rightQuestions;
}


function endSoundAndPicture() {
    // plays a different sound and shows a different picture depending on the situation
    let rightAnswers = document.getElementById('amount-of-right-answers').innerHTML;
    let allQuestions = document.getElementById('amount-of-questions').innerHTML;
    if (rightAnswers >= (allQuestions / 2 + 1)) {
        document.getElementById('header-img').src = './img/trophy.png';
        audio_success.play();
    } else {
        document.getElementById('header-img').src = './img/fail.jpg';
        audio_fail.play();
    }
}


function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}


function goToNextQuestion() {
    // Show question
    let question = questions[currentQuestion];
    document.getElementById('number-current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function answer(answer) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = answer.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedAnswerNumber == question['right_answer']) {
        document.getElementById(answer).parentNode.classList.add('bg-success');
        audio_right.play();
        rightQuestions++;
    } else {
        document.getElementById(answer).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audio_wrong.play();
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion() {
    currentQuestion++; // die Variable z.B von 0 auf 1 erhöhen!
    document.getElementById('next-button').disabled = true;
    resetAnswerBackground();
    showQuestion();
}


function resetAnswerBackground() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function restartQuiz() {
    document.getElementById('header-img').src = './img/pencils.jpg';
    document.getElementById('question-body').style = ''; // question-body wieder anzeigen
    document.getElementById('end-screen').style = 'display: none;'; // end-screen ausblenden
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}