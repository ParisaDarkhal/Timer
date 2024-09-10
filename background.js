chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0;
    const isRunning = res.isRunning ?? false;
    if (!isRunning) {
      return;
    }
    chrome.storage.local.set({
      timer: time + 1,
    });
    chrome.action.setBadgeText({
      text: `${time + 1}`,
    });
    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000;
      if (time % notificationTime === 0 && time / notificationTime === 1) {
        chrome.notifications.create({
          type: "basic",
          // iconUrl: "icon.png",
          title: "Timer Extension",
          message: `${notificationTime} seconds passed.`,
          priority: 2,
        });
        console.log("times up");
      }
    });

    // chrome.storage.sync.get(["notificationTime"], (res) => {
    //   const notificationTime = res.notificationTime ?? 1000;
    //   if (time % notificationTime === 0 && time / notificationTime === 1) {
    //     this.registration.showNotification("Timer Extension", {
    //       body: `${notificationTime} seconds passed.`,
    //       icon: "icon.png",
    //       priority: 2,
    //     });
    //     console.log("times up");
    //   }
    // });
  });
});

chrome.permissions.contains({ permissions: ["notifications"] }, (result) => {
  if (result) {
    console.log("Notifications allowed!");
    // Your notification creation code here
  } else {
    console.log("Notifications not allowed.");
    // Handle permission request
  }
});
