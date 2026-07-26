let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms){

    let milliseconds = ms % 1000;
    let seconds = Math.floor(ms/1000)%60;
    let minutes = Math.floor(ms/60000)%60;
    let hours = Math.floor(ms/3600000);

    return (
        String(hours).padStart(2,'0') + ":" +
        String(minutes).padStart(2,'0') + ":" +
        String(seconds).padStart(2,'0') + "." +
        String(milliseconds).padStart(3,'0')
    );
}

function updateDisplay(){
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click",()=>{

    if(!running){
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay,10);
    }

});

document.getElementById("pause").addEventListener("click",()=>{

    if(running){
        running = false;
        clearInterval(timerInterval);
    }

});

document.getElementById("reset").addEventListener("click",()=>{

    running = false;
    clearInterval(timerInterval);

    elapsedTime = 0;
    display.textContent = "00:00:00.000";

    laps.innerHTML = "";
    lapCount = 1;

});

document.getElementById("lap").addEventListener("click",()=>{

    if(running){

        const li = document.createElement("li");

        li.innerHTML = `
        <span>Lap ${lapCount++}</span>
        <span>${formatTime(elapsedTime)}</span>
        `;

        laps.prepend(li);
    }

});