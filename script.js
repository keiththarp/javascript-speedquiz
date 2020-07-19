// Variables for Timer display area
const displayBox = document.querySelector(".display-box");
const displayLabel = document.querySelector("#display-label");
const timerDisplay = document.querySelector("#timer-display");

// Quiz card elements
const quizBox = document.querySelector(".quiz-box");
const answerList = document.querySelector("#answer-list");
const questionText = document.querySelector(".question-text");
const answerListItems = answerList.getElementsByTagName("li");
const answerTextArea = answerList.getElementsByTagName("span");
const answerButton = answerList.getElementsByTagName("button");
const questionHeader = document.querySelector(".question-header");

// Welcome card elements
const welcomeBox = document.querySelector(".welcome-box");

//Score card elements
const initOne = document.querySelector("init-1");
const initTwo = document.querySelector("init-2");
const initThree = document.querySelector("init-3");
const modalBox = document.querySelector(".modal-box");
const initForm = document.querySelector("#init-form");
const scoreBox = document.querySelector(".score-box");
const highScoreList = document.querySelector("#high-score-list");
const highScoreListItems = highScoreList.getElementsByTagName("li");
const highScoreTextArea = highScoreList.querySelectorAll(".name-score");

// Global variables
let currentAnswer = 0;
let questionIncrement = 0;

let storedHighScores = JSON.parse(localStorage.getItem("highScores"));




// Building the timer
let startTime = 180;
let countDownInterval;

function countDown() {
  countDownInterval = setInterval(function () {
    startTime -= 1;

    // Format the display for minutes and seconds
    let minutes = Math.floor(startTime / 60);
    let seconds = Math.floor(startTime % 60);

    // Add a zero for formatting to double digit display
    if (seconds < 10) {
      timerDisplay.innerHTML = minutes + ":0" + seconds;
    } else {
      timerDisplay.innerHTML = minutes + ":" + seconds;
    }

    // End game when timer reaches 0
    if (startTime < 0) {
      clearInterval(countDownInterval);
      timerDisplay.textContent = "EXPIRED";
      displayBox.setAttribute("class", "wrong-display-box");
      startTime = 0;
      endScreen();
    }
  }, 1000);
}

// *** Quiz Items ***

// Building the question objects array.
const questions = [
  {
    questionNumber: "QuestionOne",
    question: "Select the correct syntax to create a 'Function.'",
    options: ["function = myFunction()", "var = myFunction()", "function myFunction()", "All of the above", "None of the above"],
    answer: "2"
  },
  {
    questionNumber: "QuestionTwo",
    question: "Select the correct syntax for an 'If Statement.'",
    options: ["if x > y, then x = z", "if (x > y) { x = z }", "{if x > Y} then (x = z)", "All of the above", "None of the above"],
    answer: "1"
  },
  {
    questionNumber: "QuestionThree",
    question: "Select the correct syntax to create a 'For Loop.'",
    options: ["for i < 5, i++", "for (let i = 0; i < 5; i++)", "for (i < 5; while i = 0)", "All of the above", "None of the above"],
    answer: "1"
  },
  {
    questionNumber: "QuestionFour",
    question: "Select the correct syntax for an array.",
    options: ["[2, 4, 6]", "[\"2\", \"4\", \"6\"]", "[\"two\", \"four\", \"six\"]", "All of the above", "None of the above"],
    answer: "3"
  },
  {
    questionNumber: "QuestionFive",
    question: "Which of these statement will return a Boolean value?",
    options: ["x < y", "x === y", "x > y", "All of the above", "None of the above"],
    answer: "3"
  }
];

// Run through the question objects array to ask the questions
function askQuestions() {

  // Write the question title and actual question
  questionHeader.textContent = questions[questionIncrement].questionNumber;
  questionText.textContent = questions[questionIncrement].question;

  // Loop to add the answer options
  for (let j = 0; j < answerTextArea.length; j++) {
    answerTextArea[j].innerHTML = questions[questionIncrement].options[j];
  }

}

// Adding the listener for the answer option buttons
answerList.addEventListener("click", function () {
  const button = event.target;
  currentAnswer = button.value;
  if (button.matches("button")) {

    // Check the answer
    if (button.value === questions[questionIncrement].answer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }

  }
})

// Set up some feedback for the answers
function correctAnswer() {
  //Shut the buttons off while the feedback happens.
  answerList.setAttribute("class", "disable-button");

  // Use green to notify user of correct answer
  answerListItems[currentAnswer].setAttribute("class", "correct-answer");
  answerTextArea[currentAnswer].setAttribute("class", "answer-pad");
  displayBox.setAttribute("class", "correct-display-box");

  // Add bonus time for correct answer and display CORRECT!!
  startTime += 10;
  answerTextArea[currentAnswer].textContent = " CORRECT!!"

  // Give some time for the feedback to register before clearing it.
  setTimeout(function () {
    answerListItems[currentAnswer].removeAttribute("class", "correct-answer");
    answerTextArea[currentAnswer].removeAttribute("class", "answer-pad");
    displayBox.setAttribute("class", "display-box");
    answerList.removeAttribute("class", "disable-button");
    nextQuestion();
  }, 1100);

}

function wrongAnswer() {
  //Shut the buttons off while the feedback happens.
  answerList.setAttribute("class", "disable-button");

  // Use green to notify user of correct answer
  answerListItems[currentAnswer].setAttribute("class", "wrong-answer");
  answerTextArea[currentAnswer].setAttribute("class", "answer-pad");
  displayBox.setAttribute("class", "wrong-display-box");

  // Penalize 30 seconds for incorrect answer and display INCORRECT!!
  startTime -= 30;
  answerTextArea[currentAnswer].textContent = " INCORRECT!!"

  // Give some time for the feedback to register before clearing it.
  setTimeout(function () {
    answerListItems[currentAnswer].removeAttribute("class", "wrong-answer");
    answerTextArea[currentAnswer].removeAttribute("class", "answer-pad");
    displayBox.setAttribute("class", "display-box");
    answerList.removeAttribute("class", "disable-button");
    nextQuestion();
  }, 1100);

}

// Moving to next question if there is one. Otherwise send to High Score screen
function nextQuestion() {
  questionIncrement++;
  if (questionIncrement >= questions.length) {
    clearInterval(countDownInterval);
    endScreen();
  } else {
    askQuestions();
  }
}

// *** High Score Screen ***

// Some filler high scores for fun, this gets called at the start of the game.
function initHighScoreObj() {
  // We're only going to fill if the local memory is empty.
  if (storedHighScores === null) {
    let highScoreObj = [
      {
        initials: "KST",
        score: 219
      },
      {
        initials: "FOO",
        score: 103
      },
      {
        initials: "BAR",
        score: 64
      },
      {
        initials: "FIZ",
        score: 28
      },
      {
        initials: "BUZ",
        score: 1
      }
    ];
    // Sending the scores to local memory then bringing them back.
    localStorage.setItem("highScores", JSON.stringify(highScoreObj));
    storedHighScores = JSON.parse(localStorage.getItem("highScores"));
  }
}

// Writing the high scores to the screen.
function listHighScores() {
  for (let j = 0; j < highScoreTextArea.length; j++) {
    highScoreTextArea[j].innerHTML = " " + storedHighScores[j].initials + " - " + storedHighScores[j].score;
  }
};

// Function to assist initials input box by auto tabbing
function tabOver(current, next) {
  if (current.value.length == 1) {
    next.focus();
  }
}

// Getting the scores sorted for display.
function highScoreSort() {
  storedHighScores = storedHighScores.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Code for high score modal pop-up submit button.
initForm.addEventListener("submit", function (event) {
  event.preventDefault();
  modalBox.style.display = "none";

  // Formatting the user's initials for appearance on High Score list.
  let userInitials = `${initForm[0].value}${initForm[1].value}${initForm[2].value}`;
  userInitials = userInitials.toUpperCase();

  // Adding the user to the high score array
  storedHighScores.push({ initials: userInitials, score: startTime });

  // now that the user's initials have been added the scores get sorted.
  highScoreSort();

  // added this to keep the list only as long as needed. Avoiding excessive local storage.
  storedHighScores = storedHighScores.slice(0, 6);

  //Now the new High Score object array gets sent to local storage.
  localStorage.setItem("highScores", JSON.stringify(storedHighScores));

  // Write the newly updated high score list to the screen.
  listHighScores();
  modalBox.setAttribute("class", "hide-card");
  initForm.reset();
});

/* Display the High Score screen, write the scores to the screen,
and determine whether to display the initials modal for user input.*/
function endScreen() {
  quizBox.setAttribute("class", "hide-card");
  scoreBox.removeAttribute("class", "hide-card");
  displayLabel.textContent = "Your Score"
  timerDisplay.textContent = startTime;
  listHighScores();

  if (parseInt(startTime) > storedHighScores[4].score) {
    modalBox.setAttribute("class", "modal-start");
    modalBox.style.display = "block";
    setTimeout(function () {
      initForm[0].focus();
      modalBox.setAttribute("class", "modal-reveal");
    }, 200);

  }
}

// Restart the quiz called from HTML, button positioned on high score screen
function tryAgain() {
  questionIncrement = 0;
  displayLabel.textContent = "Timer"
  startTime = 180;
  timerDisplay.textContent = "3:00";
  welcomeBox.setAttribute("class", "welcome-box");
  scoreBox.setAttribute("class", "hide-card");
  displayBox.setAttribute("class", "display-box");
}

/* This is the first function to fire and start the game, 
called from the HTML, button on welcome screen.*/
function startQuiz() {
  // Begin the timer
  countDown();
  // Remove the welcome screen and bring up the Quiz screen
  welcomeBox.setAttribute("class", "hide-card");
  quizBox.setAttribute("class", "show-time");

  // Call the question populator and check local memory for existing high scores.
  askQuestions();
  initHighScoreObj();
  // Keeping the clear storage helper here for testing
  // localStorage.clear();
};