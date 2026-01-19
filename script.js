let topHeadings = document.querySelectorAll(".top .info");
let botHeadings = document.querySelectorAll(".bot .info");
let display = document.querySelector("#display");

let totalSeconds = 25 * 60;
let timer = null;

topHeadings.forEach((topHeading) => {
  topHeading.addEventListener("click", function (e) {
    clearInterval(timer);
    timer = null;

    topHeadings.forEach((h) => h.classList.remove("default"));
    e.currentTarget.classList.add("default");

    if (e.currentTarget.id === "short-break") {
      totalSeconds = 5 * 60;
    } else if (e.currentTarget.id === "long-break") {
      totalSeconds = 15 * 60;
    } else {
      totalSeconds = 25 * 60;
    }

    updateUI();
  });
});

function startCountdown() {
  if (timer) return;
  if (totalSeconds <= 0) return;

  totalSeconds--;
  updateUI();

  timer = setInterval(() => {
    totalSeconds--;
    updateUI();

    if (totalSeconds <= 0) {
      clearInterval(timer);
      timer = null;
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(timer);
  timer = null;
}

function resetCountdown() {
  clearInterval(timer);
  timer = null;

  if (document.querySelector("#short-break").classList.contains("default")) {
    totalSeconds = 5 * 60;
  } else if (
    document.querySelector("#long-break").classList.contains("default")
  ) {
    totalSeconds = 15 * 60;
  } else {
    totalSeconds = 25 * 60;
  }

  updateUI();
}

botHeadings.forEach((botHeading) => {
  botHeading.addEventListener("click", function (e) {
    botHeadings.forEach((h) => h.classList.remove("default"));
    e.currentTarget.classList.add("default");

    if (e.currentTarget.id == "start") {
      startCountdown();
    } else if (e.currentTarget.id == "pause") {
      pauseCountdown();
    } else {
      resetCountdown();
    }
  });
});

function updateUI() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  display.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
