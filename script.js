const startButton = document.querySelector("#start");
const timerDisplay = document.querySelector("#timer-display");
const questionHeader = document.querySelector(".question-header");
const questionText = document.querySelector(".question-text");
const welcomeBox = document.querySelector(".welcome-box");
const quizBox = document.querySelector(".quiz-box");
const answerList = document.querySelector("#answer-list");
const answerListItems = answerList.getElementsByTagName("span");




// Building the timer
let startTime = 180;
function countDown() {
  setInterval(function () {
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
      clearInterval(countDown);
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

  for (i = 0; i < questions.length; i++) {
    console.log(questions[i]);
    questionHeader.textContent = questions[i].questionNumber;
    questionText.textContent = questions[i].question;
    for (j = 0; j < answerListItems.length; j++) {
      console.log(questions[i].answer);
      // answerListItems[j].textContent = questions[i].options[j];
      answerListItems[j].innerHTML = questions[i].options[j];
    }
    answerList.addEventListener("click", function (event) {
      event.preventDefault();
      console.log(event);
      let element = event.target;
      if (element.matches("button")) {
        alert(questions[i].answer);
      }


    })

  }

}

function startQuiz() {
  countDown();
  welcomeBox.setAttribute("class", "hide-card");
  quizBox.removeAttribute("class", "hide-card");
  askQuestions();

}

startButton.addEventListener("click", startQuiz);

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