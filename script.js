const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const circle = document.getElementById("circle");
const timeDisplay = document.getElementById("timeDisplay");

const totalTime = 3600; // 10 seconds for testing
let timeLeft = totalTime;
let timerRunning = false;
let countdown;

let lastDisplayedSecond = null;

function updateTimer() {
  const progress = (totalTime - timeLeft) / totalTime;
  const degrees = progress * 360;
  circle.style.background = `conic-gradient(#e74c3c ${degrees}deg, #eee 0deg)`;

  // round to whole seconds for display
  const displaySeconds = Math.floor(timeLeft);

  // update text only if second changed
  if (displaySeconds !== lastDisplayedSecond) {
    lastDisplayedSecond = displaySeconds;
    const minutes = Math.floor(displaySeconds / 60);
    const seconds = displaySeconds % 60;
    timeDisplay.textContent = `${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
}


function startTimer() {
  if (timerRunning) return;
  timerRunning = true;
  startButton.disabled = true;
  restartButton.disabled = true;

  const interval = 100; // update every 0.1 second
  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      circle.style.background = `conic-gradient(#e74c3c 360deg, #eee 0deg)`;
      timeDisplay.textContent = "00:00";
      timerRunning = false;
      restartButton.disabled = false;
      return;
    }

    timeLeft -= interval / 1000; // decrease time gradually
    updateTimer();
  }, interval);

}

function restartTimer() {
  clearInterval(countdown);
  timeLeft = totalTime;
  timerRunning = false;
  circle.style.background = `conic-gradient(#e74c3c 0deg, #eee 0deg)`;
  updateTimer();
  startButton.disabled = false;
  restartButton.disabled = true;
}

startButton.addEventListener("click", startTimer);
restartButton.addEventListener("click", restartTimer);

// Initialize
updateTimer();
