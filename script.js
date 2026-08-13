const STUDENT = {
  name: "Sun Lee",
  rollNo: "2023000950",
  initials: "SL"
};

const questions = window.QUESTION_DATA;
let current = Math.max(
  1,
  Math.min(40, Number(new URLSearchParams(window.location.search).get("q")) || 1)
);
const answers = {};
let seconds = 50 * 60;

const $ = id => document.getElementById(id);

function q() { return questions[current - 1]; }


function renderStudentProfile() {
  const name = document.getElementById("studentName");
  const roll = document.getElementById("studentId");
  const initials = document.getElementById("studentInitials");

  if (name) name.textContent = STUDENT.name;
  if (roll) roll.textContent = STUDENT.rollNo;
  if (initials) initials.textContent = STUDENT.initials;
}

function render() {
  const item = q();

  // Section title
  $("sectionBar").firstChild.textContent =
    item.section === "reading"
      ? "읽기 (20문항)"
      : "듣기 (20문항)";

  $("group").textContent = item.group;
  $("qTitle").textContent = `${item.id}.`;
  $("prompt").textContent = item.text;

  const image = $("mediaImage");
  const audio = $("audioPlaceholder");
  const options = $("options");
  const contentRow = document.querySelector(".content-row");
  const mediaPanel = $("mediaPanel");

  /* =========================================
     Q36 and Q37 special picture layout
     ========================================= */

  if (item.id === 36 || item.id === 37) {
    contentRow.classList.add("picture-question");
  } else {
    contentRow.classList.remove("picture-question");
  }

  /* =========================================
     Reset media area
     ========================================= */

  image.classList.add("hidden");
  audio.classList.add("hidden");

  mediaPanel.classList.remove("text-content");

  const oldText = mediaPanel.querySelector(".media-text");
  if (oldText) {
    oldText.remove();
  }

  /* =========================================
     Q36 and Q37
     ========================================= */

  if (item.id === 36 || item.id === 37) {

    // Show audio button
    audio.classList.remove("hidden");

    // Do NOT show q36.jpg or q37.jpg
    image.classList.add("hidden");

  }

  /* =========================================
     Normal questions
     ========================================= */

  else {

    // Question has an image
    if (item.media) {

      image.src = item.media;
      image.classList.remove("hidden");

    }

    // Question has text but no audio
    else if (item.text && !item.audio) {

      let textBox = document.createElement("div");

      textBox.className = "media-text";
      textBox.textContent = item.text;

      mediaPanel.appendChild(textBox);
      mediaPanel.classList.add("text-content");

    }

    // Audio-only question
    if (item.audio && !item.media) {
      audio.classList.remove("hidden");
    }

    // Image + audio question
    if (item.audio && item.media) {
      audio.classList.remove("hidden");
    }
  }

  /* =========================================
     Create answer choices
     ========================================= */

  options.innerHTML = "";

  /* =========================================
     Q36 and Q37 = picture choices
     ========================================= */

  if (item.id === 36 || item.id === 37) {

    options.className = "options picture-options";

    item.options.forEach((text, index) => {

      const button = document.createElement("button");

      button.className = "picture-option";

      if (answers[item.id] === index) {
        button.classList.add("selected");
      }

      const picture = document.createElement("img");

      if (item.id === 36) {
        picture.src = `assets/q36-${index + 1}.png`;
      } else {
        picture.src = `assets/q37-${index + 1}.png`;
      }

      picture.alt =
        `Question ${item.id}, option ${index + 1}`;

      button.appendChild(picture);

      button.addEventListener("click", () => {
        answers[item.id] = index;
        render();
      });

      options.appendChild(button);
    });

  }

  /* =========================================
     All other questions = normal choices
     ========================================= */

  else {

    options.className = "options";

    item.options.forEach((text, index) => {

      const button = document.createElement("button");

      button.className = "option";

      if (answers[item.id] === index) {
        button.classList.add("selected");
      }

      const num = document.createElement("span");

      num.className = "option-num";
      num.textContent = `①②③④`[index];

      const label = document.createElement("span");

      label.textContent = text;

      button.append(num, label);

      button.addEventListener("click", () => {
        answers[item.id] = index;
        render();
      });

      options.appendChild(button);
    });
  }

  /* =========================================
     Navigation buttons
     ========================================= */

  $("prevBtn").disabled = current === 1;

  $("nextBtn").textContent =
    current === 40
      ? "Submit >>"
      : "Next >>";

   renderNavigation();
  updateStats();
}

function renderNavigation() {
  const reading = $("readingGrid");
  const listening = $("listeningGrid");

  reading.innerHTML = "";
  listening.innerHTML = "";

  questions.forEach(item => {
    const button = document.createElement("button");

    button.className = "number";
    button.textContent = item.id;

    if (item.id === current) {
      button.classList.add("current");
    }

    if (answers[item.id] !== undefined) {
      button.classList.add("answered");
    }

    button.onclick = () => {
      current = item.id;
      render();
    };

    (item.section === "reading" ? reading : listening)
      .appendChild(button);
  });
}

function updateStats() {
  const solved = Object.keys(answers).length;
  $("solved").textContent = solved;
  $("unsolved").textContent = 40 - solved;
}

function next() {
  if (current < 40) {
    current++;
    render();
  } else {
    openSubmit();
  }
}

function previous() {
  if (current > 1) {
    current--;
    render();
  }
}

function openAllQuestions() {
  const grid = $("allGrid");
  grid.innerHTML = "";
  questions.forEach(item => {
    const b = document.createElement("button");
    b.className = "number";
    b.textContent = item.id;
    if (item.id === current) b.classList.add("current");
    if (answers[item.id] !== undefined) b.classList.add("answered");
    b.onclick = () => {
      current = item.id;
      $("allModal").classList.add("hidden");
      render();
    };
    grid.appendChild(b);
  });
  $("allModal").classList.remove("hidden");
}

function openSubmit() {
  const unanswered = 40 - Object.keys(answers).length;
  $("submitText").textContent =
    unanswered
      ? `You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Are you sure you want to submit?`
      : "You have answered all 40 questions. Are you sure you want to submit?";
  $("submitModal").classList.remove("hidden");
}

function submitExam() {
  $("submitModal").classList.add("hidden");
  $("resultAnswered").textContent = Object.keys(answers).length;
  $("resultUnanswered").textContent = 40 - Object.keys(answers).length;
  $("resultModal").classList.remove("hidden");
}

function tick() {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  $("timer").textContent = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  if (seconds > 0) seconds--;
}

$("prevBtn").onclick = previous;
$("nextBtn").onclick = next;
$("allBtn").onclick = openAllQuestions;
$("submitBtn").onclick = openSubmit;
$("confirmSubmit").onclick = submitExam;
$("cancelSubmit").onclick = () => $("submitModal").classList.add("hidden");
$("audioButton").onclick = () => alert("Connect the real Korean audio file here.");
$("closeResult").onclick = () => $("resultModal").classList.add("hidden");

document.querySelectorAll("[data-close]").forEach(btn => {
  btn.onclick = () => $(btn.dataset.close).classList.add("hidden");
});

renderStudentProfile();
render();
tick();
setInterval(tick, 1000);
