// State: { startDate: "YYYY-MM-DD" | null, log: { "YYYY-MM-DD": [exerciseId, ...] } }
const STORAGE_KEY = "fitnessPlan_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { startDate: null, log: {} };
    const parsed = JSON.parse(raw);
    const rawLog = parsed.log || {};
    const log = {};
    Object.keys(rawLog).forEach((dateStr) => {
      log[dateStr] = (rawLog[dateStr] || []).map((entry) =>
        typeof entry === "string" ? { id: entry, name: entry, custom: false } : entry
      );
    });
    return { startDate: parsed.startDate || null, log };
  } catch (e) {
    return { startDate: null, log: {} };
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

function todayStr() {
  const d = new Date();
  return dateToStr(d);
}

function dateToStr(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + day;
}

function formatPretty(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function dayPlanForDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const jsDay = dt.getDay(); // 0 = Sunday
  const mondayFirstIndex = (jsDay + 6) % 7; // 0 = Monday ... 6 = Sunday
  return WEEK_PLAN[mondayFirstIndex];
}

function daysBetween(startStr, endStr) {
  const [sy, sm, sd] = startStr.split("-").map(Number);
  const [ey, em, ed] = endStr.split("-").map(Number);
  const start = Date.UTC(sy, sm - 1, sd);
  const end = Date.UTC(ey, em - 1, ed);
  return Math.round((end - start) / 86400000);
}

function isLogged(dateStr, exerciseId) {
  return (state.log[dateStr] || []).some((e) => e.id === exerciseId);
}

function findPlanItemById(exerciseId) {
  for (const day of WEEK_PLAN) {
    const found = day.items.find((it) => it.id === exerciseId);
    if (found) return found;
  }
  return null;
}

function toggleExercise(dateStr, exerciseId) {
  if (!state.log[dateStr]) state.log[dateStr] = [];
  const idx = state.log[dateStr].findIndex((e) => e.id === exerciseId);
  if (idx >= 0) {
    state.log[dateStr].splice(idx, 1);
    if (state.log[dateStr].length === 0) delete state.log[dateStr];
  } else {
    const item = findPlanItemById(exerciseId);
    state.log[dateStr].push({ id: exerciseId, name: item ? item.name : exerciseId, custom: false });
  }
  saveState(state);
  renderActiveTab();
}

function addCustomLog(dateStr, name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return;
  if (!state.log[dateStr]) state.log[dateStr] = [];
  state.log[dateStr].push({
    id: "custom-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    name: trimmed,
    custom: true,
  });
  saveState(state);
  renderActiveTab();
}

function removeLogEntry(dateStr, entryId) {
  if (!state.log[dateStr]) return;
  state.log[dateStr] = state.log[dateStr].filter((e) => e.id !== entryId);
  if (state.log[dateStr].length === 0) delete state.log[dateStr];
  saveState(state);
  renderActiveTab();
}

function computeStreak() {
  let streak = 0;
  let cursor = new Date();
  // if today has no items expected and none logged, still fine; walk backward
  for (let i = 0; i < 365; i++) {
    const dStr = dateToStr(cursor);
    const plan = dayPlanForDate(dStr);
    const loggedCount = (state.log[dStr] || []).length;
    const isRestDay = plan.items.length === 0;
    const satisfied = isRestDay || loggedCount > 0;
    if (dStr === todayStr() && !satisfied) {
      // today not done yet doesn't break streak, just don't count it
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    if (!satisfied) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function totalWorkoutDays() {
  return Object.keys(state.log).filter((k) => state.log[k].length > 0).length;
}

// ---------- Rendering ----------

const main = document.getElementById("main");
let activeTab = "dashboard";

function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  renderActiveTab();
}

function renderActiveTab() {
  if (activeTab === "dashboard") renderDashboard();
  else if (activeTab === "week") renderWeek();
  else if (activeTab === "nutrition") renderNutrition();
  else if (activeTab === "habits") renderHabits();
  else if (activeTab === "progress") renderProgress();
}

function exerciseCardHtml(item, dateStr, interactive) {
  const done = isLogged(dateStr, item.id);
  return (
    '<div class="exercise-card ' + (done ? "done" : "") + '">' +
      '<div class="demo-thumb">' + demoIconMarkup(item.category) + "</div>" +
      '<div class="exercise-body">' +
        '<div class="exercise-name">' + item.name + "</div>" +
        '<div class="exercise-sets">' + item.setsReps + "</div>" +
        '<div class="exercise-cue">' + item.cue + "</div>" +
        '<div class="exercise-actions">' +
          '<a class="video-link" href="' + item.video + '" target="_blank" rel="noopener noreferrer">&#9654; Watch form video</a>' +
          (interactive
            ? '<button class="check-toggle ' + (done ? "checked" : "") + '" data-exercise="' + item.id + '" data-date="' + dateStr + '" aria-label="Mark done">' + (done ? "&#10003;" : "") + "</button>"
            : "") +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

function pillClass(theme) {
  if (theme === "gym") return "pill-gym";
  if (theme === "home") return "pill-home";
  if (theme === "recovery") return "pill-recovery";
  if (theme === "rest") return "pill-rest";
  return "pill-cardio";
}

function renderDashboard() {
  const today = todayStr();
  const plan = dayPlanForDate(today);
  const hasStart = !!state.startDate;
  const dayNum = hasStart ? daysBetween(state.startDate, today) + 1 : null;
  const todayEntries = state.log[today] || [];
  const doneCount = plan.items.filter((it) => isLogged(today, it.id)).length;
  const totalCount = plan.items.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 100;
  const streak = computeStreak();
  const customEntries = todayEntries.filter((e) => e.custom);

  main.innerHTML =
    '<section class="section">' +
      '<div class="hero">' +
        '<div class="card hero-start">' +
          (hasStart
            ? '<div class="stat-label">You started your plan on</div>' +
              '<div class="big-stat">' + formatPretty(state.startDate) + "</div>" +
              '<div class="stat-label">That\'s Day ' + dayNum + " of your plan.</div>" +
              '<div class="date-row">' +
                '<button class="btn btn-ghost btn-sm" id="editStartBtn">Change start date</button>' +
                '<button class="btn btn-ghost btn-sm" id="resetBtn">Reset progress</button>' +
              "</div>"
            : '<div class="stat-label">Ready to begin?</div>' +
              '<h2>Start your plan today</h2>' +
              '<div class="date-row">' +
                '<input type="date" id="startDateInput" value="' + today + '" />' +
                '<button class="btn btn-primary" id="startPlanBtn">Start plan</button>' +
              "</div>" +
              '<div class="stat-label">You can backdate this if you already began.</div>') +
        "</div>" +
        '<div class="card stat-grid">' +
          '<div class="stat-box"><div class="num">' + streak + '</div><div class="label">Day streak</div></div>' +
          '<div class="stat-box"><div class="num">' + totalWorkoutDays() + '</div><div class="label">Workouts logged</div></div>' +
          '<div class="stat-box"><div class="num">' + (hasStart ? dayNum : "&mdash;") + '</div><div class="label">Days in program</div></div>' +
        "</div>" +
      "</div>" +

      '<div class="card today-card">' +
        '<div class="today-head">' +
          '<div class="today-title">' +
            "<h2>Today &middot; " + plan.day + "</h2>" +
            '<span class="pill ' + pillClass(plan.theme) + '">' + plan.location + "</span>" +
          "</div>" +
          '<div class="stat-label">' + plan.focus + "</div>" +
        "</div>" +
        (totalCount > 0
          ? '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
            '<div class="stat-label" style="margin-bottom:14px;">' + doneCount + " of " + totalCount + " planned today done</div>" +
            '<div class="exercise-grid">' + plan.items.map((it) => exerciseCardHtml(it, today, true)).join("") + "</div>"
          : '<div class="rest-note">Full rest day. Hydrate, sleep well, and let your muscles recover &mdash; this is part of the plan, not a break from it.</div>') +
      "</div>" +

      '<div class="card custom-log-card">' +
        '<h3 style="font-size:15px;">Did something different? Log it</h3>' +
        '<p class="stat-label" style="margin-bottom:12px;">Swap in whatever you actually did today &mdash; a walk, a class, anything not on the plan.</p>' +
        '<div class="custom-log-row">' +
          '<input type="text" id="customLogInput" placeholder="e.g. 90-minute walk" />' +
          '<button class="btn btn-primary btn-sm" id="addCustomLogBtn">Add</button>' +
        "</div>" +
        (customEntries.length > 0
          ? '<div class="custom-log-list">' +
              customEntries
                .map(
                  (e) =>
                    '<div class="custom-log-item"><span>' + escapeHtml(e.name) + '</span><button class="remove-log-btn" data-date="' + today + '" data-id="' + e.id + '" aria-label="Remove">&times;</button></div>'
                )
                .join("") +
            "</div>"
          : "") +
      "</div>" +
    "</section>";

  wireDashboardEvents();
}

function wireDashboardEvents() {
  const startBtn = document.getElementById("startPlanBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const val = document.getElementById("startDateInput").value;
      state.startDate = val || todayStr();
      saveState(state);
      renderDashboard();
    });
  }
  const editBtn = document.getElementById("editStartBtn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const val = prompt("Enter new start date (YYYY-MM-DD):", state.startDate);
      if (val && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
        state.startDate = val;
        saveState(state);
        renderDashboard();
      }
    });
  }
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("This clears your start date and all logged workouts. Continue?")) {
        state = { startDate: null, log: {} };
        saveState(state);
        renderDashboard();
      }
    });
  }
  main.querySelectorAll(".check-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleExercise(btn.dataset.date, btn.dataset.exercise);
    });
  });

  const addLogBtn = document.getElementById("addCustomLogBtn");
  const logInput = document.getElementById("customLogInput");
  if (addLogBtn && logInput) {
    const submit = () => {
      addCustomLog(todayStr(), logInput.value);
    };
    addLogBtn.addEventListener("click", submit);
    logInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submit();
    });
  }
  main.querySelectorAll(".remove-log-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeLogEntry(btn.dataset.date, btn.dataset.id);
    });
  });
}

function renderWeek() {
  const today = todayStr();
  main.innerHTML =
    '<section class="section">' +
      '<div class="section-head">' +
        "<h2>Your Weekly Plan</h2>" +
        "<p>Two gym strength days, one home strength day, a Friday walk, plus recovery and light cardio. Tap a video link to check your form.</p>" +
      "</div>" +
      '<div class="week-grid">' +
        WEEK_PLAN.map((day) => {
          const dateForThisDay = today; // reference only; not tied to a specific calendar date
          const isToday = dayPlanForDate(today).day === day.day;
          return (
            '<div class="card day-card' + (isToday ? "" : "") + '">' +
              '<div class="day-card-head">' +
                '<div class="day-title"><h3>' + day.day + "</h3>" + (isToday ? '<span class="pill pill-recovery">Today</span>' : "") + "</div>" +
                '<span class="pill ' + pillClass(day.theme) + '">' + day.location + "</span>" +
              "</div>" +
              '<div class="day-focus" style="margin-bottom:12px;">' + day.focus + "</div>" +
              (day.items.length > 0
                ? '<div class="exercise-grid">' + day.items.map((it) => exerciseCardHtml(it, dateForThisDay, false)).join("") + "</div>"
                : '<div class="rest-note">Full rest and recovery.</div>')
            + "</div>"
          );
        }).join("") +
      "</div>" +
    "</section>";
}

function renderNutrition() {
  main.innerHTML =
    '<section class="section">' +
      '<div class="section-head">' +
        "<h2>Nutrition Plan: Fuel Metabolism & Hormone Balance</h2>" +
        "<p>Focus on nutrient-dense foods that stabilize blood sugar and prevent cortisol spikes, which encourage abdominal fat storage.</p>" +
      "</div>" +
      '<div class="pillar-grid">' +
        NUTRITION_PILLARS.map(
          (p) =>
            '<div class="card pillar-card">' +
              '<div class="pillar-icon">' + demoIconMarkup(p.icon) + "</div>" +
              "<div><h3>" + p.title + "</h3><p>" + p.detail + "</p></div>" +
            "</div>"
        ).join("") +
      "</div>" +
    "</section>";
}

function renderHabits() {
  main.innerHTML =
    '<section class="section">' +
      '<div class="section-head">' +
        "<h2>Key Habits for Abdominal Fat Loss</h2>" +
        "<p>Consistency in these habits matters as much as the workouts themselves.</p>" +
      "</div>" +
      '<div class="habit-grid">' +
        KEY_HABITS.map(
          (h, i) =>
            '<div class="card habit-card">' +
              '<div class="habit-num">0' + (i + 1) + "</div>" +
              "<h3>" + h.title + "</h3>" +
              "<p>" + h.detail + "</p>" +
            "</div>"
        ).join("") +
      "</div>" +
    "</section>";
}

function renderProgress() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayString = todayStr();

  let cells = "";
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((d) => {
    cells += '<div class="cal-dow">' + d + "</div>";
  });
  for (let i = 0; i < startOffset; i++) cells += '<div class="cal-cell empty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dStr = dateToStr(new Date(year, month, d));
    const hasLog = (state.log[dStr] || []).length > 0;
    const isToday = dStr === todayString;
    cells += '<div class="cal-cell ' + (hasLog ? "has-log" : "") + " " + (isToday ? "today" : "") + '">' + d + "</div>";
  }

  const logEntries = Object.keys(state.log)
    .filter((k) => state.log[k].length > 0)
    .sort((a, b) => (a < b ? 1 : -1))
    .slice(0, 30);

  main.innerHTML =
    '<section class="section">' +
      '<div class="section-head">' +
        "<h2>Your Progress</h2>" +
        "<p>" + (state.startDate ? "Tracking since " + formatPretty(state.startDate) + "." : "Set a start date on the Today tab to begin tracking.") + "</p>" +
      "</div>" +
      '<div class="card" style="padding:20px;">' +
        "<h3 style=\"font-size:15px;\">" + today.toLocaleDateString(undefined, { month: "long", year: "numeric" }) + "</h3>" +
        '<div class="calendar">' + cells + "</div>" +
      "</div>" +
      '<div class="card" style="padding:20px; margin-top:16px;">' +
        '<h3 style="font-size:15px;">Recent workout log</h3>' +
        (logEntries.length > 0
          ? '<div class="log-list">' +
              logEntries
                .map(
                  (dStr) =>
                    '<div class="log-row"><span class="log-date">' + formatPretty(dStr) + "</span><span class=\"log-count\">" + state.log[dStr].map((e) => escapeHtml(e.name)).join(", ") + "</span></div>"
                )
                .join("") +
            "</div>"
          : '<div class="empty-state">No workouts logged yet. Check off exercises on the Today tab as you complete them.</div>') +
      "</div>" +
    "</section>";
}

// ---------- Init ----------

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab-btn");
  if (btn) setTab(btn.dataset.tab);
});

renderActiveTab();
