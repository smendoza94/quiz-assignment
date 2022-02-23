var timerEl = document.getElementById('timer'); // timer element for countdown function

var startBtn = document.getElementById(`startBtn`); // start button for eventlister to start quiz and timer
var h1El = document.querySelector(`.quizContainer h1`); // will erase once the quiz starts
var pEl = document.querySelector(`.quizContainer p`); // displays the intro and questions

var qstCont = document.getElementById(`question-container`); // continer that holds the question display
var optCont = document.querySelector(`.optionsContainer`);// container that holds the answer buttons

const qstEl = document.getElementById(`question`); // element of html that will display the question
const ansBtns = document.getElementById(`answer-buttons`); // container that holds the answer buttons

let shuffledQuestions, currentQuestionIndex

// array of questions and answers
const questions = [
    {
        question: `Javascript is an _______ language?`,
        answers: [
            {text: 'Object-Oriented', correct: true},
            {text: 'Object-Based', correct: false},
            {text: 'Procedural', correct: false},
            {text: 'None of the above', correct: false},
        ],
    },
    // {
    //     question: `Which of the following keywords is used to define a variable in Javascript?`,
    //     answers: [
    //         {text: 'var', correct: false},
    //         {text: 'let', correct: false},
    //         {text: 'Both A and B', correct: true},
    //         {text: 'None of the above', correct: false},
    //     ],
    // },
    // {
    //     question: `Which of the following methods is used to access HTML elements using Javascript?`,
    //     answers: [
    //         {text: 'getElementbyId()', correct: false},
    //         {text: 'getElementbyByClassName()', correct: false},
    //         {text: 'Both A and B', correct: true},
    //         {text: 'None of the above', correct: false},
    //     ],
    // },
    // {
    //     question: `Upon encountering empty statements, what does the Javascript Interpreter do?`,
    //     answers: [
    //         {text: 'Throws an Error', correct: false},
    //         {text: 'Ignores the statements', correct: true},
    //         {text: 'Gives a warning', correct: false},
    //         {text: 'None of the above', correct: false},
    //     ],
    // },
    // {
    //     question: `Which of the following methods can be used to display data in some form using Javascript?`,
    //     answers: [
    //         {text: 'document.write()', correct: false},
    //         {text: 'console.log()', correct: false},
    //         {text: 'window.alert()', correct: false},
    //         {text: 'All of the above', correct: true},
    //     ],
    // },
    // {
    //     question: `How can a datatype be declared to be a constant type?`,
    //     answers: [
    //         {text: 'const', correct: true},
    //         {text: 'var', correct: false},
    //         {text: 'let', correct: false},
    //         {text: 'constant', correct: false},
    //     ],
    // },
];

startBtn.addEventListener('click',startGame) // listen for the click of the start button then run the startGame function
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})


function startGame() {
    startBtn.classList.add('hide'); // when the game is started, hide the start button
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    qstCont.classList.remove('hide');
    setNextQuestion()
};

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
    qstEl.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        ansBtns.appendChild(button);
    })
};

function resetState() {
    while (ansBtns.firstChild) {
        ansBtns.removeChild(ansBtns.firstChild);
    }
};

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(ansBtns.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startBtn.innerText = "restart";
        startBtn.classList.remove('hide');
    }
    nextButton.classList.remove('hide');
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
};

// function createQABlock() {
//     const output = []; // initialize array for html output
//     for (let i = 0; i < questions.length; i++) {
//         var btn = document.createElement("button");
//         pEl.textContent = questions[i].question;
//         console.log(pEl.textContent);
//     }

// };
// createQABlock();
// // once the button is clicked start the quiz
// startBtn.addEventListener("click", function() {
//     countdown(); // start the timer once the quiz button is clicked
    
//     h1El.textContent = ""; // clear the h1 element of a title when the quiz starts
//     startBtn.remove(); // remove the initial start button when clicked 


//     pEl.textContent = questions[1].question;

//     var btn1 = document.createElement("button");
//     var btn2 = document.createElement("button");
//     var btn3 = document.createElement("button");
//     var btn4 = document.createElement("button");

//     btn1.textContent = questions[1].answers[0].a;
//     btn2.textContent = questions[1].answers[1].b;
//     btn3.textContent = questions[1].answers[2].c;
//     btn4.textContent = questions[1].answers[3].d;

//     optCont.appendChild(btn1);
//     optCont.appendChild(btn2);
//     optCont.appendChild(btn3);
//     optCont.appendChild(btn4);
// });


// Timer that counts down from 100 seconds
function countdown() {
    var timeLeft = 100;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = 'Score: ' + timeLeft;
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = 'Score: 0';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
      }
    }, 1000);
}