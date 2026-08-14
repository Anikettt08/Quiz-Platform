const API_BASE_URL = window.API_BASE_URL || "http://127.0.0.1:8000";
const QUIZ_ID = new URLSearchParams(location.search).get("quiz") || "exam1";
const STUDENT = { name: "Student 001", rollNo: "student_001", initials: "S1" };
let questions = [], attemptId = null, current = 1, seconds = 0;
const answers = {};
const $ = id => document.getElementById(id);

async function api(path, options = {}) {
  const r = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!r.ok) {
    let detail = `API request failed (${r.status})`;
    try { detail = (await r.json()).detail || detail; } catch (_) {}
    throw new Error(detail);
  }
  return r.status === 204 ? null : r.json();
}

function normalizeQuestion(x) {
  const type = String(x.question_type || "reading").toLowerCase();
  const listening = ["audio_option", "image_audio"].includes(type) || !!x.audio_url;
  return {
    id: x.question_number,
    backendId: x.id,
    section: listening ? "listening" : "reading",
    group: listening ? "Listening" : "Reading",
    text: x.text || "",
    media: x.image_url || null,
    audio: x.audio_url || null,
    options: (x.options || []).map(o => ({ id: o.id, text: o.text, audio_url: o.audio_url }))
  };
}

function renderStudentProfile() {
  if ($("studentName")) $("studentName").textContent = STUDENT.name;
  if ($("studentId")) $("studentId").textContent = STUDENT.rollNo;
  if ($("studentInitials")) $("studentInitials").textContent = STUDENT.initials;
}

function render() {
  const item = questions[current - 1];
  if (!item) return;
  $("sectionBar").firstChild.textContent = item.section === "reading" ? "읽기 (20문항)" : "듣기 (20문항)";
  $("group").textContent = item.group;
  $("qTitle").textContent = `${item.id}.`;
  $("prompt").textContent = item.text;

  const image = $("mediaImage"), audio = $("audioPlaceholder"), panel = $("mediaPanel"), options = $("options");
  image.classList.add("hidden"); audio.classList.add("hidden"); panel.classList.remove("text-content");
  const oldText = panel.querySelector(".media-text"); if (oldText) oldText.remove();
  if (item.media) { image.src = item.media; image.classList.remove("hidden"); }
  else if (item.text && !item.audio) {
    const t = document.createElement("div"); t.className = "media-text"; t.textContent = item.text;
    panel.appendChild(t); panel.classList.add("text-content");
  }
  if (item.audio) audio.classList.remove("hidden");

  options.innerHTML = ""; options.className = "options";
  item.options.forEach((o, i) => {
    const b = document.createElement("button"); b.className = "option";
    if (answers[item.backendId] === o.id) b.classList.add("selected");
    const n = document.createElement("span"); n.className = "option-num"; n.textContent = `①②③④`[i] || `${i + 1}.`;
    const label = document.createElement("span"); label.textContent = o.text;
    b.append(n, label); b.onclick = () => selectAnswer(item, o.id); options.appendChild(b);
  });
  $("prevBtn").disabled = current === 1;
  $("nextBtn").textContent = current === questions.length ? "Submit >>" : "Next >>";
  renderNavigation(); updateStats();
}

async function selectAnswer(item, optionId) {
  answers[item.backendId] = optionId; render();
  try {
    await api(`/api/attempts/${attemptId}/answer`, { method: "POST", body: JSON.stringify({ question_id: item.backendId, selected_option_id: optionId }) });
  } catch (e) {
    delete answers[item.backendId]; render(); alert(`Could not save this answer: ${e.message}`);
  }
}

function renderNavigation() {
  const r = $("readingGrid"), l = $("listeningGrid"); r.innerHTML = ""; l.innerHTML = "";
  questions.forEach(item => {
    const b = document.createElement("button"); b.className = "number"; b.textContent = item.id;
    if (item.id === current) b.classList.add("current");
    if (answers[item.backendId] !== undefined) b.classList.add("answered");
    b.onclick = () => { current = item.id; render(); };
    (item.section === "reading" ? r : l).appendChild(b);
  });
}

function updateStats() {
  const solved = Object.keys(answers).length;
  $("solved").textContent = solved; $("unsolved").textContent = questions.length - solved;
}
function next() { if (current < questions.length) { current++; render(); } else openSubmit(); }
function previous() { if (current > 1) { current--; render(); } }
function openAllQuestions() {
  const grid = $("allGrid"); grid.innerHTML = "";
  questions.forEach(item => { const b = document.createElement("button"); b.className = "number"; b.textContent = item.id; if (item.id === current) b.classList.add("current"); if (answers[item.backendId] !== undefined) b.classList.add("answered"); b.onclick = () => { current = item.id; $("allModal").classList.add("hidden"); render(); }; grid.appendChild(b); });
  $("allModal").classList.remove("hidden");
}
function openSubmit() {
  const n = questions.length - Object.keys(answers).length;
  $("submitText").textContent = n ? `You still have ${n} unanswered question${n === 1 ? "" : "s"}. Are you sure you want to submit?` : `You have answered all ${questions.length} questions. Are you sure you want to submit?`;
  $("submitModal").classList.remove("hidden");
}
async function submitExam() {
  $("submitModal").classList.add("hidden");
  try {
    const result = await api(`/api/attempts/${attemptId}/submit`, { method: "POST" });
    $("resultAnswered").textContent = Object.keys(answers).length;
    $("resultUnanswered").textContent = questions.length - Object.keys(answers).length;
    $("resultModal").classList.remove("hidden"); console.log("Attempt submitted:", result);
  } catch (e) { alert(`Could not submit the exam: ${e.message}`); }
}
function tick() { const m = Math.floor(seconds / 60), s = seconds % 60; $("timer").textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; if (seconds > 0) seconds--; }
async function refreshServerTimer() { if (!attemptId) return; try { const s = await api(`/api/attempts/${attemptId}/status`); seconds = s.time_remaining_seconds; } catch (e) { console.error(e); } }

async function initializeExam() {
  try {
    const started = await api(`/api/attempts/start/${encodeURIComponent(QUIZ_ID)}`, { method: "POST" });
    attemptId = started.attempt_id;
    seconds = Math.max(0, Math.floor(started.expires_at - Date.now() / 1000));
    const payload = await api(`/api/attempts/${encodeURIComponent(attemptId)}/questions`);
    questions = payload.questions.map(normalizeQuestion);
    if (!questions.length) throw new Error("The backend returned no questions.");
    current = Math.min(current, questions.length); renderStudentProfile(); render(); tick();
    setInterval(tick, 1000); setInterval(refreshServerTimer, 10000);
  } catch (e) {
    console.error("Exam initialization failed:", e);
    alert(`Could not connect to the quiz API at ${API_BASE_URL}.\n\n${e.message}`);
  }
}

$("prevBtn").onclick = previous; $("nextBtn").onclick = next; $("allBtn").onclick = openAllQuestions;
$("submitBtn").onclick = openSubmit; $("confirmSubmit").onclick = submitExam;
$("cancelSubmit").onclick = () => $("submitModal").classList.add("hidden");
$("audioButton").onclick = async () => {
  const item = questions[current - 1]; if (!item || !attemptId) return;
  try {
    const r = await api(`/api/attempts/${attemptId}/audio-play`, { method: "POST", body: JSON.stringify({ question_id: item.backendId }) });
    alert(`Audio plays remaining: ${r.plays_remaining}`);
  } catch (e) { alert(`Audio cannot be played: ${e.message}`); }
};
$("closeResult").onclick = () => $("resultModal").classList.add("hidden");
document.querySelectorAll("[data-close]").forEach(btn => { btn.onclick = () => $(btn.dataset.close).classList.add("hidden"); });
renderStudentProfile(); initializeExam();
