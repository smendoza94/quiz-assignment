var timerEl = document.getElementById('timer'); // timer element for countdown function

var startBtn = document.getElementById(`startBtn`);
var h1El = document.querySelector(`.quizContainer h1`)
var pEl = document.querySelector(`.quizContainer p`)

var optCont = document.querySelector(`.optionsContainer`)

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
    {
        question: `Which of the following keywords is used to define a variable in Javascript?`,
        answers: [
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'Both A and B', correct: true},
            {text: 'None of the above', correct: false},
        ],
    },
    {
        question: `Which of the following methods is used to access HTML elements using Javascript?`,
        answers: [
            {text: 'getElementbyId()', correct: false},
            {text: 'getElementbyByClassName()', correct: false},
            {text: 'Both A and B', correct: true},
            {text: 'None of the above', correct: false},
        ],
    },
    {
        question: `Upon encountering empty statements, what does the Javascript Interpreter do?`,
        answers: [
            {text: 'Throws an Error', correct: false},
            {text: 'Ignores the statements', correct: true},
            {text: 'Gives a warning', correct: false},
            {text: 'None of the above', correct: false},
        ],
    },
    {
        question: `Which of the following methods can be used to display data in some form using Javascript?`,
        answers: [
            {text: 'document.write()', correct: false},
            {text: 'console.log()', correct: false},
            {text: 'window.alert()', correct: false},
            {text: 'All of the above', correct: true},
        ],
    },
    {
        question: `How can a datatype be declared to be a constant type?`,
        answers: [
            {text: 'const', correct: true},
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'constant', correct: false},
        ],
    },
]

// once the button is clicked start the quiz
startBtn.addEventListener("click", function() {
    countdown(); // start the timer once the quiz button is clicked
    
    h1El.textContent = ""; // clear the h1 element of a title when the quiz starts
    startBtn.remove(); // remove the initial start button when clicked 

    pEl.textContent = "Javascript is an ________ language?"

    var btn1 = document.createElement("button");
    var btn2 = document.createElement("button");
    var btn3 = document.createElement("button");
    var btn4 = document.createElement("button");

    btn1.textContent = "Object-Oriented";
    btn2.textContent = "Object-Based";
    btn3.textContent = "Procedural";
    btn4.textContent = "None of the Above";

    optCont.appendChild(btn1);
    optCont.appendChild(btn2);
    optCont.appendChild(btn3);
    optCont.appendChild(btn4);
});

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