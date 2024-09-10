const timeElement = document.getElementById("time");
const currentDate = new Date().toLocaleDateString();
const currentTime = new Date().toLocaleTimeString();
const nameElement = document.getElementById("name");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

// chrome.action.setBadgeText({ text: "TIME" }, () => {
//   console.log("Badge was set.");
// });

function updateTimeElements() {
  chrome.storage.local.get(["timer"], (res) => {
    const time = res.timer ?? 0;
    timerElement.textContent = `The time is at: ${time} seconds.`;
  });

  timeElement.textContent = `The date is: ${currentDate}, the time is: ${currentTime}`;
}

updateTimeElements();
setInterval(updateTimeElements, 1000);

chrome.action.setBadgeTextColor({ color: "white" }, () => {
  console.log("Badge color set.");
});

chrome.action.setBadgeBackgroundColor({ color: "rgb(63, 105, 182)" }, () => {
  console.log("Badge background color set.");
});

chrome.storage.sync.get("name", (res) => {
  if (res.name === undefined) {
    nameElement.textContent = `Hi new user! Please enter your name in options page.`;
  } else {
    nameElement.textContent = `Hi ${res.name}`;
  }
});

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,
  });
});

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  }, () => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    }
  });
  chrome.action.setBadgeText({
    text: "0",
  });
});
