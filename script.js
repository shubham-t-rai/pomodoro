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

    botHeadings.forEach((h) => h.classList.remove("default"));

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
    if (e.currentTarget.id == "reset") {
      e.currentTarget.classList.remove("default");
    }

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
let settings = document.querySelector("#settings");
let settingsCard = null;

settings.addEventListener("click", function () {
  if (settingsCard) return;

  settingsCard = document.createElement("div");
  settingsCard.className = "settings-container";

  settingsCard.innerHTML = `
    <div class="settings-card" style="gap:7vw;">
      <div class="general" style="color: white;">
        <p tabindex="0">General</p>
        <p tabindex="0">Timers</p>
        <p tabindex="0">Sounds</p>
        <button id="resetAll">Reset All</button>
      </div>

      <div class="theme">
        <p style="color:white;">Select Theme:</p>
        <select id="theme1">
          <option value="1">Aesthetic Tokyo</option>
          <option value="2">Mount Fuji</option>
          <option value="3">Paris</option>
        </select>
          <p class="desc" style="color: #646c74;margin-top: 5vh;">The Pomodoro Technique is a time-management method where work is done in focused 25-minute intervals called Pomodoros, followed by short breaks. After four Pomodoros, a longer break is taken. This technique improves concentration, reduces fatigue, and helps manage tasks efficiently.</p>
        <div class="theme-buttons">
          <button class="close">Close</button>
          <button class="saveChanges">Save Changes</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(settingsCard);

  settingsCard.querySelector(".close").addEventListener("click", () => {
    settingsCard.remove();
    settingsCard = null;
  });

  const themeSelect = settingsCard.querySelector("#theme1");

  themeSelect.addEventListener("change", function () {
    if (this.value === "1") {
      document.body.style.backgroundColor='';
      console.log("gy");
      document.body.style.backgroundImage =
        "url('https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg')";
        document.body.style.color="#f6f3fa"
    } else if (this.value === "2") {
      document.body.style.backgroundColor='';
      document.body.style.backgroundImage =
        "url('https://images.pexels.com/photos/20193437/pexels-photo-20193437.jpeg')";
        document.body.style.color="#f6f3fa"
    } else if (this.value === "3") {
      document.body.style.backgroundColor='';
      document.body.style.backgroundImage =
        "url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34')";
        document.body.style.color="#f6f3fa"
    }

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.overflow = "hidden";
  });
});