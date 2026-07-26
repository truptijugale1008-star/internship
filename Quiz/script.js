const quizData=[

{
type:"single",
question:"1. Which language is used for webpage structure?",
options:["Python","HTML","Java","C++"],
answer:"HTML"
},

{
type:"multiple",
question:"2. Which are JavaScript Frameworks?",
options:["React","Angular","Python","Vue"],
answer:["React","Angular","Vue"]
},

{
type:"fill",
question:"3. CSS stands for ______ Style Sheets.",
answer:"Cascading"
},

{
type:"single",
question:"4. Which tag is used to create a hyperlink?",
options:["<img>","<a>","<table>","<div>"],
answer:"<a>"
},

{
type:"fill",
question:"5. JavaScript runs inside the ______.",
answer:"browser"
}

];

let currentQuestion=0;
let score=0;

const quiz=document.getElementById("quiz");
const nextBtn=document.getElementById("nextBtn");
const progress=document.getElementById("progress");

function loadQuestion(){

let q=quizData[currentQuestion];

progress.innerHTML=`Question ${currentQuestion+1} of ${quizData.length}`;

let html=`<div class="question">${q.question}</div>`;

if(q.type==="single"){

q.options.forEach(option=>{
html+=`
<label class="option">
<input type="radio" name="answer" value="${option}">
${option}
</label>`;
});

}

else if(q.type==="multiple"){

q.options.forEach(option=>{
html+=`
<label class="option">
<input type="checkbox" value="${option}">
${option}
</label>`;
});

}

else{

html+=`
<input type="text" id="fillAnswer" placeholder="Type your answer">
`;

}

quiz.innerHTML=html;

}

loadQuestion();

nextBtn.onclick=function(){

let q=quizData[currentQuestion];

if(q.type==="single"){

let selected=document.querySelector("input[name='answer']:checked");

if(selected){

if(selected.value===q.answer)
score++;

}

}

else if(q.type==="multiple"){

let checked=[...document.querySelectorAll("input[type='checkbox']:checked")].map(x=>x.value);

checked.sort();
let ans=[...q.answer].sort();

if(JSON.stringify(checked)===JSON.stringify(ans))
score++;

}

else{

let value=document.getElementById("fillAnswer").value.trim().toLowerCase();

if(value===q.answer.toLowerCase())
score++;

}

currentQuestion++;

if(currentQuestion<quizData.length){

loadQuestion();

}
else{

showResult();

}

}

function showResult(){

quiz.innerHTML=`
<div class="result">
<h2>🎉 Quiz Completed!</h2>

<div class="score">
Your Score<br>
${score} / ${quizData.length}
</div>

<button class="restart" onclick="restartQuiz()">
Restart Quiz
</button>

</div>
`;

progress.innerHTML="";
nextBtn.style.display="none";

}

function restartQuiz(){

currentQuestion=0;
score=0;

nextBtn.style.display="inline-block";

loadQuestion();

}