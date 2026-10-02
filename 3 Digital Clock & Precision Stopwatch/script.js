/*
    ALGORITHM: Digital Clock & Precision Stopwatch

    1. SETUP:
       - Get the digital clock display element.
       - Get the stopwatch display element.
       - Get the Start, Stop, and Reset buttons.
       - Initialize stopwatch variables:
         - `startTime` to store the starting time.
         - `elapsedTime` to store the total elapsed time.
         - `timerInterval` to store the interval ID.
       - Set `timerInterval` to null initially.

    2. DIGITAL CLOCK FUNCTION (`updateClock()`):
       - Create a new Date object to get the current date and time.
       - Extract the current hours, minutes, and seconds.
       - Add a leading zero if any value is less than 10.
       - Display the formatted time in the clock element.
       - Use `setInterval()` to call `updateClock()` every 1000 milliseconds.
       - Call `updateClock()` once initially so the clock displays immediately.

    3. STOPWATCH DISPLAY FUNCTION (`updateStopwatch()`):
       - Calculate the current elapsed time using:
         `Date.now() - startTime + elapsedTime`.
       - Convert the elapsed time into:
         - Minutes
         - Seconds
         - Milliseconds
       - Format each value with leading zeros where required.
       - Display the formatted stopwatch time in the stopwatch element.

    4. START BUTTON LOGIC:
       - When the Start button is clicked:
           - Check if the stopwatch is already running.
           - If it is not running:
               - Set `startTime` to the current time using `Date.now()`.
               - Start an interval that calls `updateStopwatch()` repeatedly.
               - Store the interval ID in `timerInterval`.

    5. STOP BUTTON LOGIC:
       - When the Stop button is clicked:
           - Check if the stopwatch is currently running.
           - Calculate the elapsed time since `startTime`.
           - Add this time to `elapsedTime`.
           - Clear the running interval using `clearInterval()`.
           - Set `timerInterval` back to `null`.

    6. RESET BUTTON LOGIC:
       - When the Reset button is clicked:
           - Stop the running interval using `clearInterval()`.
           - Set `timerInterval` to `null`.
           - Reset `startTime` to `null`.
           - Reset `elapsedTime` to `0`.
           - Set the stopwatch display back to `00:00:00`.

    7. INITIALIZATION:
       - Call `updateClock()` once on startup.
       - Display the initial stopwatch value as `00:00:00`.
       - Keep the digital clock running continuously using `setInterval()`.

*/

// WRITE YOUR CODE BELOW:
// SETUP

const clock = document.getElementById("clock");
const stopwatch = document.getElementById("stopwatch");

const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let startTime = null;
let elapsedTime = 0;
let timerInterval = null;


// DIGITAL CLOCK

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);


// STOPWATCH

function updateStopwatch() {
    const currentElapsedTime = Date.now() - startTime + elapsedTime;

    const minutes = Math.floor(currentElapsedTime / 60000);
    const seconds = Math.floor((currentElapsedTime % 60000) / 1000);
    const milliseconds = currentElapsedTime % 1000;

    stopwatch.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + ":" +
        String(milliseconds).padStart(3, "0");
}


// START BUTTON

startButton.addEventListener("click", function () {
    if (timerInterval === null) {
        startTime = Date.now();

        timerInterval = setInterval(updateStopwatch, 10);
    }
});


// STOP BUTTON

stopButton.addEventListener("click", function () {
    if (timerInterval !== null) {
        elapsedTime += Date.now() - startTime;

        clearInterval(timerInterval);

        timerInterval = null;
    }
});


// RESET BUTTON

resetButton.addEventListener("click", function () {
    clearInterval(timerInterval);

    timerInterval = null;
    startTime = null;
    elapsedTime = 0;

    stopwatch.textContent = "00:00:00";
});


// INITIAL DISPLAY

stopwatch.textContent = "00:00:00";