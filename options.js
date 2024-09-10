const nameInput = document.getElementById("name-input");
const saveBtn = document.getElementById("save-btn");
const timeInput = document.getElementById("time-input");

function saveName() {
  const name = nameInput.value;
  const notificationTime = timeInput.value;
  chrome.storage.sync.set({ name, notificationTime }, () => {
    console.log(`name ${name} is saved.`);
  });
  chrome.storage.sync.get(["name", "notificationTime"], (res) => {
    nameInput.value = res.name;
    if (!notificationTime) {
      timeInput.value = 1000;
    } else {
      timeInput.value = res.notificationTime;
    }

    console.log(
      `name ${res.name} and time ${timeInput.value} comes from storage.`
    );
    nameInput.value = null;
    timeInput.value = null;
  });
}

// chrome.storage.sync.get("name", (res) => {
//   nameInput.value = res.name;
//   console.log(`name ${res.name} comes from storage.`);
//   nameInput.value = null;
// });

saveBtn.addEventListener("click", saveName);

nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    saveName();
  }
});
