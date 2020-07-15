const nextButton = document.querySelector("#next-button");
const displayBox = document.querySelector(".display-box");
const displayLabel = document.querySelector("#display-label");
const timerDisplay = document.querySelector("#timer-display");
const questionHeader = document.querySelector(".question-header");
const questionText = document.querySelector(".question-text");
const welcomeBox = document.querySelector(".welcome-box");
const quizBox = document.querySelector(".quiz-box");
const scoreBox = document.querySelector(".score-box");
const answerList = document.querySelector("#answer-list");
const answerListItems = answerList.getElementsByTagName("li");
const answerTextArea = answerList.getElementsByTagName("span");
const answerButton = answerList.getElementsByTagName("button");
let questionIncrement = 0;
let currentAnswer = 0;


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


    // If the count down is over, write some text 
    if (startTime < 0) {
      clearInterval(countDownInterval);
      timerDisplay.textContent = "EXPIRED";
    }
  }, 1000);
}

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
  },
];

function askQuestions() {
  console.log("first log question increment = " + questionIncrement)

  console.log(questions[questionIncrement]);

  questionHeader.textContent = questions[questionIncrement].questionNumber;
  questionText.textContent = questions[questionIncrement].question;

  for (let j = 0; j < answerTextArea.length; j++) {

    // answerTextArea[j].textContent = questions[i].options[j];
    answerTextArea[j].innerHTML = questions[questionIncrement].options[j];
  }

}
answerList.addEventListener("click", function () {
  console.log(event);
  console.log(event.target);
  const button = event.target;
  console.log(button.value);
  currentAnswer = button.value;
  if (button.matches("button")) {

    if (button.value === questions[questionIncrement].answer) {
      correctAnswer();
    } else {
      wrongAnswer();
    }

  }
})



function correctAnswer() {
  answerList.setAttribute("class", "disable-button");
  answerListItems[currentAnswer].setAttribute("class", "correct-answer");
  answerTextArea[currentAnswer].setAttribute("class", "answer-pad");
  displayBox.setAttribute("class", "correct-display-box");
  startTime += 10;
  answerTextArea[currentAnswer].textContent = " CORRECT!!"
  setTimeout(function () {
    answerListItems[currentAnswer].removeAttribute("class", "correct-answer");
    answerTextArea[currentAnswer].removeAttribute("class", "answer-pad");
    displayBox.setAttribute("class", "display-box");
    answerList.removeAttribute("class", "disable-button");
    nextQuestion();
  }, 1100);

}

function wrongAnswer() {
  answerList.setAttribute("class", "disable-button");
  answerListItems[currentAnswer].setAttribute("class", "wrong-answer");
  answerTextArea[currentAnswer].setAttribute("class", "answer-pad");
  displayBox.setAttribute("class", "wrong-display-box");
  startTime -= 30;
  answerTextArea[currentAnswer].textContent = " INCORRECT!!"
  setTimeout(function () {
    answerListItems[currentAnswer].removeAttribute("class", "wrong-answer");
    answerTextArea[currentAnswer].removeAttribute("class", "answer-pad");
    displayBox.setAttribute("class", "display-box");
    answerList.removeAttribute("class", "disable-button");
    nextQuestion();
  }, 1100);

}

function nextQuestion() {
  questionIncrement++;
  if (questionIncrement >= questions.length) {
    clearInterval(countDownInterval);
    endScreen();
  } else {
    askQuestions();
  }

}

function endScreen() {
  quizBox.setAttribute("class", "hide-card");
  scoreBox.removeAttribute("class", "hide-card");
  displayLabel.textContent = "Your Score"
  timerDisplay.textContent = startTime;
}

function startQuiz() {
  countDown();
  welcomeBox.setAttribute("class", "hide-card");
  quizBox.removeAttribute("class", "hide-card");
  askQuestions();

}



/* -- NOTES --

Initial page welcomes student and lays out the details for the quiz.
- There will be 5 questions
- Start with a total of three minutes to complete the quiz
- when start button is clicked, timer starts and first question is displayed.
- answering question reveals correct answer with color green and incorrect answers in red.
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