// var startScreen = document.getElementById("start-screen");
// var endScreen = document.getElementById("end-screen");
// var quizScreen = document.getElementById("quiz-screen");
const startButton = document.querySelector("#start");
const timerDisplay = document.querySelector("#timer-display");

startButton.addEventListener("click", countDown);

// var index = 0;

// Building the timer
let startTime = 180;
function countDown() {
  setInterval(function () {
    startTime -= 1;

    let minutes = Math.floor(startTime / 60);
    let seconds = Math.floor(startTime % 60);

    // Output the result in an element with id="demo"
    if (seconds < 10) {
      timerDisplay.innerHTML = minutes + ":0" + seconds;
    } else {
      timerDisplay.innerHTML = minutes + ":" + seconds;
    }


    // If the count down is over, write some text 
    if (startTime === 0) {
      clearInterval(countDown);
      timerDisplay.innerHTML = "EXPIRED";
    }
  }, 1000);
}

var questions = [
  {
    question: "What day is it?",
    choices: ["monday", "b", "c"],
    correct: "monday",
  },
  {},
  {},
  {},
];

function startGame() {
  startScreen.setAttribute("class", "hide");
  quizScreen.removeAttribute("class", "hide");
  buildQuestionCard();
}

function buildQuestionCard() {
  var questionEl = document.getElementById("question-title");
  questionEl.textContent = questions[index].question;
}


/* -- NOTES --

Initial page welcomes student and lays out the details for the quiz.
- There will be 5 questions
- Start with a total of three minutes to complete the quiz
- when start button is clicked, timer starts and first question is displayed.
- answering question reveals correct answer with color green and incorect answers in red.
- if student answers correctly the answer they chose gets a check mark to replace the number.
- if the student answers incorrectly the number is replaces with an X



## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score



*/