let timeLeft = 100;  // Timer that counts down from 100 seconds as the "score"

let timerEl = document.getElementById('timer'); // timer element for countdown function

let startBtn = document.getElementById(`startBtn`); // start button for eventlister to start quiz and timer
const h1El = document.querySelector(`.quizContainer h1`); // will erase once the quiz starts
const pEl = document.querySelector(`.quizContainer p`); // displays the intro and questions

const qstCont = document.getElementById(`question-container`); // continer that holds the question display
const optCont = document.querySelector(`.optionsContainer`);// container that holds the answer buttons
const quizTitle = document.getElementById(`quiz-title`) // only the quiz title element

const qstEl = document.getElementById(`question`); // element of html that will display the question
const ansBtns = document.getElementById(`answer-buttons`); // container that holds the answer buttons

const scoreForm = document.getElementById('score-form'); // high score submission are hidden by default, unhide when quiz done
const subBtn = document.getElementById('save-score'); // high score name submission button saved to variable for event listener


// create the feedback element that shows if user answered correctly or incorrectly
const resultEl = document.createElement("div"); // create div element for "results display/feedback"
resultEl.classList.add('hide'); // give it a hidden property and show it once 
resultEl.id = "result";
ansBtns.appendChild(resultEl);

// initialize variable that will hold the shuffled questions called shuffledQuestions
// initialize variable that will hold the index number of the current displayed question to show called currentQuestionIndex
let shuffledQuestions, currentQuestionIndex 

let scoreIdCounter; // save each score as a unique label indexed number starting at 0
let highScores = []; // initilaize the array that will save all user high scores

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
];

startBtn.addEventListener('click',startGame) // listen for the click of the start button then run the startGame function

function startGame() {

    timeLeft = 100;
    startBtn.classList.add('hide'); // when the game is started, hide the start button
    
    qstEl.classList.remove('hide'); // hide the question display element
    resultEl.classList.remove('hide'); // hide the result feedback element for a cleaner look 

    quizTitle.innerHTML = ""; // clear the title when the game starts
    shuffledQuestions = questions.sort(() => Math.random() - .5); // sort the questions array randomly and save them to ShuffledQuestions
    currentQuestionIndex = 0; // start at the first question/answers at index 0
    setNextQuestion(); // load the question and display it at the current 
    countdown(); // start the countdown "score" 
};

function setNextQuestion() {
    resetState(); // remove and clear any buttons on the screen
    showQuestion(shuffledQuestions[currentQuestionIndex]); // create and display questions and answer buttons for the current index count
};

function resetState() { // remove and clear any buttons on the screen
    while (ansBtns.firstChild) { // while there are answer buttons displayed...
        ansBtns.removeChild(ansBtns.firstChild); // ... remove the buttons on the screen
    }
};

function countdown() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    let timeInterval = setInterval(function () {
        if (currentQuestionIndex + 1 === shuffledQuestions.length) { // when the current question is equal to the number of qeustions
            timerEl.textContent = 'Score: ' + timeLeft;
            clearInterval(timeInterval);
        } 
        else if (timeLeft > 0) { // As long as the `timeLeft` is greater than 1
            timerEl.textContent = 'Score: ' + timeLeft; // Set the `textContent` of `timerEl` to show the remaining seconds
            timeLeft--; // Decrement `timeLeft` by 1
        } 
        else {
            timeLeft = 0; // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = 'Score: ' + timeLeft; 
            clearInterval(timeInterval); // Use `clearInterval()` to stop the timer
        }
    }, 1000); // wait 1000 ms (1 second) before running the loop function again
}; 

function showQuestion(question) { // load the question into the display and create/display new buttons with answers 
    qstEl.innerHTML = question.question; // set the text inside of the question id to the question from array 
    question.answers.forEach(answer => { // for each answer text in the array 
        const button = document.createElement("button"); // create a html button element 
        button.innerText = answer.text; // set the innet text to the answer 
        button.classList.add('btn'); // add the css style class "btn" to the button element
        if (answer.correct) { // if the "text" key has a corresponding "correct" key that is true...  
            button.dataset.correct = answer.correct; // ... add the property of "correct" to this button
        }
        // add the event listener for when the button is clicked
        // when it is clicked show the result and load the next question or 
        // if last question show high score and ask to resart
        button.addEventListener("click", selectAnswer); 
        ansBtns.appendChild(button); // display the created answer button to the user to click
    })
};

function selectAnswer(event) { // listen for the button click of an answer button
    const selectedButton = event.target; // save the user's choice from the answer button click 
    const correct = selectedButton.dataset.correct; // save the data if the button clicked has a "correct" value

    resultEl.classList.remove('hide'); // unhide the feedback of whether the selection was correct or not
    setResultDisplay(resultEl, correct); // if the button click is correct 
    console.log(currentQuestionIndex+1, " < ", shuffledQuestions.length);
    if (currentQuestionIndex + 1 < shuffledQuestions.length) { // if there are still more questions
        currentQuestionIndex++; // point to the next question
        setNextQuestion(); // and start the loop again
    } else { // if there isnt any more questions load the the end screen with high scores
        setHighScore(); // load high scores
    };
    ansBtns.appendChild(resultEl); // show in html if user was correct or incorrect
};

function setResultDisplay(element, correct) { // take in html element and "correct" value data 
    if (correct) {
        element.innerHTML = "Correct !" // change inner text element to display correct
    } else {
        element.innerHTML = "Incorrect !   - 10 Points." // change inner text element to display incorrect
        timeLeft = parseInt(timeLeft) - 10; // when user is incorrect, reduce the timer "score" by 10 points
    }
};

function setHighScore() {
    let userScore = timeLeft; // the user score will be saved from the current timer value
    resetState(); // clear all buttons on screen
    quizTitle.innerHTML = "High Scores"; // change title to High Scores
    // shows the user their score and instructs them to enter their name to save their high score
    qstEl.innerHTML = "You scored: " + userScore + " points! Please enter your name to save your score:"
    scoreForm.classList.remove('hide'); // show the form section that contains text box input and a submit button
    subBtn.addEventListener('click', submitHighScore);

    // create html elements with high score title, and li list of scores
    // ask for user name to add to high score
    // unhide the start button and rename innterHTML to "restart"
};

function submitHighScore(event) {
    event.preventDefault(); // keeps the page from refreshing
    userScore = timeLeft; // set the stopped time value to the user's score
    let scoreNameInput = document.querySelector("input[name='score-name']").value; // take the user input of "name" and save to a variable
    document.querySelector("input[name='score-name']").value = ""; //rest the form fields for the next name to be entered
    // create the object with all collected information that will later be pushed into localstorage array
    scoreDataObj = {
        name: scoreNameInput,
        score: userScore,
    };
    // display and save to local storage
    createScoreEl(scoreDataObj);
};

function createScoreEl(scoreDataObj) {

    qstEl.classList.add('hide'); // hide the question display element
    scoreForm.classList.add('hide'); // hide the high score name and submit section
    resultEl.classList.add('hide'); // hide the result feedback element for a cleaner look   
    
    startBtn.classList.remove('hide'); // unhide the start button
    startBtn.innerHTML = "Restart";
    
    let loadScores = localStorage.getItem('scores')
    
    const scoreCont = document.createElement('ul')
    scoreCont.className = "score-container";
    optCont.appendChild(scoreCont);

    question.answers.forEach(answer => { // for each answer text in the array 
        const button = document.createElement("button"); // create a html button element 
        button.innerText = answer.text; // set the innet text to the answer 
        button.classList.add('btn'); // add the css style class "btn" to the button element
        if (answer.correct) { // if the "text" key has a corresponding "correct" key that is true...  
            button.dataset.correct = answer.correct; // ... add the property of "correct" to this button
        }
        // add the event listener for when the button is clicked
        // when it is clicked show the result and load the next question or 
        // if last question show high score and ask to resart
        button.addEventListener("click", selectAnswer); 
        ansBtns.appendChild(button); // display the created answer button to the user to click
    })

    // load tasks
    
    scoreDataObj.id = scoreIdCounter; // save task as an object with name, score, and id
    highScores.push(scoreDataObj); // push object into highScores array

    localStorage.setItem("highScores", JSON.stringify(highScores)); // save scores to localstorage

    scoreIdCounter++; // increase score ID counter for next unique name/score id
};