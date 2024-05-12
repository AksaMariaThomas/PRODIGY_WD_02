let timer;
let isRunning = false;
let startTime;
let lapTimes = [];
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapList = document.getElementById('lapList');

function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const millis = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${millis}`;
}

function updateTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = new Date().getTime();
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function lap() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    lapTimes.push(formatTime(elapsedTime));
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTimes[lapTimes.length - 1];
    lapList.appendChild(lapItem);
}

function reset() {
    clearInterval(timer);
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    isRunning = false;
    startTime = 0;
    lapTimes = [];
    lapList.innerHTML = '';
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);
