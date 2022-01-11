const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

// const high_score = [];

// Getting Elements From Document

const view_high_score_button = document.getElementById("leaderboard");
const start_section = document.querySelector(".start");
const highscore_section = document.querySelector(".high-score");
const btn_goback = document.getElementById("goback-btn");
const btn_clear_highscore = document.getElementById("clear-highscore-btn");
const btn_start_quiz = document.getElementById("start-btn");
const quiz_section = document.querySelector(".quiz");
const timer = document.querySelector(".timer");
const question_container = document.querySelector(".ques");
const all_done_section = document.querySelector(".all-done");
const score = document.querySelector(".score");
const submit_score_btn = document.querySelector("#submit-btn");
const initial = document.querySelector("#initial-name-tf");
const high_score_display = document.querySelector(".high-scores-display");

// variables
var sec = 50;
var second_timer;
// adding event listener on elements

view_high_score_button.addEventListener("click", displayHighscores);
btn_goback.addEventListener("click", displayStart);
btn_start_quiz.addEventListener("click", startQuiz);
submit_score_btn.addEventListener("click", submitScore);
btn_clear_highscore.addEventListener("click", clearHighScores);

// functions

// to display high score and it hides start container
function displayHighscores(){
  start_section.classList.add("not-active");
  highscore_section.classList.remove("not-active");
  all_done_section.classList.add("not-active");

 

  // getting data from local storage
  const data = JSON.parse(localStorage.getItem("data_key") || "[]");
  console.log(data);
  data.forEach( (d, index) => {
 
    const p = document.createElement("p");
    p.innerHTML = `${index+1}. ${d.user_name} -  ${d.user_score}`;
    high_score_display.append(p);
  });
}

// to display strtcontainer
function displayStart(){
  start_section.classList.remove("not-active");
  highscore_section.classList.add("not-active");

  timer.innerHTML = "";
  
}

// to start quiz
function startQuiz(){
  start_section.classList.add("not-active");
  quiz_section.classList.remove("not-active");
  sec = 50;
  
  getQuestion(0);
  startTimer();

  
}

// after finishing quiz or timeout
function finishQuiz(){
  quiz_section.classList.add("not-active");
  all_done_section.classList.remove("not-active");

  let sec = timer.innerHTML;
  score.innerHTML = sec;
  initial.value = "";
}

// for timer of 50 sec
var startTimer = () => {
   second_timer = setInterval( () => {
    timer.innerHTML = (sec);
    sec--
    if(sec < 0){
      finishQuiz();
      clearInterval(second_timer);  
    }
    
  }, 1000);
};


// to deduct time when user answer is wrong
function onWrongAnswer(){
  if( sec > 10)
    sec = sec - 10;
  else 
    sec = 0;
}




// to add question from question array to html
function getQuestion(id){
  question_container.innerHTML = `        
  <h1 class="question" data-qid="${id}">${questions[id].questionText}</h1>

  <div class="option-container">
      <div class="option-one option">
          <p>${questions[id].options[0]}</p>
      </div>
      <div class="option-two option">
          <p>${questions[id].options[1]}</p>
      </div>
      <div class="option-three option">
          <p>${questions[id].options[2]}</p>
      </div>
      <div class="option-four option">
          <p>${questions[id].options[3]}</p>
      </div>
  </div> 

  `;

  const all_options = document.querySelectorAll(".option");
  all_options.forEach( (option) => {
    option.addEventListener("click", checkAnswer)
  });

  
}

// to check answer

function checkAnswer(e){
  const answer = e.currentTarget.querySelector("p").textContent;
  let qid = e.currentTarget.parentElement.parentElement.querySelector(".question").getAttribute("data-qid");

  // if answer is right 
  if( answer == questions[qid].answer){

    qid++;
    if(qid <= questions.length - 1){
      getQuestion(qid);
      showAlert("Correct");
    } else {
      clearInterval(second_timer);
      finishQuiz();

      // go to highscores
    }
    
  } else {

    onWrongAnswer();
    showAlert("Incorrect");
  }

}

// to submit the score
// we are stroring highscores in localstorage

function submitScore(){
  
  // let userName = initial.value;
  let user_score = score.innerHTML;
  let user_name = initial.value;
  
  clearInterval(second_timer);
  const local_storage = window.localStorage;
  var user_data = JSON.parse(local_storage.getItem("data_key") || "[]");

  if( user_name ){  
    let data = { user_name, user_score};
    user_data.push(data);
    local_storage.setItem("data_key", JSON.stringify(user_data));
    displayHighscores();

  } else {
    
  }
  console.log(user_score);

}


// alert for answer result or any error

function showAlert(alert_message){
  const alert = document.querySelector("#alert");
  alert.innerHTML = alert_message;

  setInterval( () => { alert.innerHTML = ""}, 1500);

}


// delete highscore

function clearHighScores(){
  localStorage.clear();
  high_score_display.innerHTML = "";
}