const API_BASE = "http://localhost:3000/student/attendance";

// Elements
const attDate = document.getElementById("attDate");
const btnSearch = document.getElementById("btnSearch");
const btnFetchReport = document.getElementById("btnFetchReport");
const form = document.querySelector("form");
const btnMark = document.getElementById("btnMark");
const summaryBox = document.getElementById("summary");

// Hide Mark button by default
btnMark.style.display = "none";

// Default roster for new dates
const DEFAULT_NAMES = [
  "Siva",
  "Rajesh",
  "Ashok",
  "Sai",
  "Haritha",
  "Ram",
  "Krishna",
  "Aru",
  "Ammu",
  "Adi",
  "Venkat",
];

// Events
btnSearch.addEventListener("click", onSearch);
btnFetchReport.addEventListener("click", onFetchReport);
form.addEventListener("submit", onSubmitAttendance);

// Helpers
function clearRows() {
  document.querySelectorAll(".row").forEach((el) => el.remove());
}

function styleRow(div) {
  div.style.display = "grid";
  div.style.gridTemplateColumns = "1fr 120px 120px";
  div.style.alignItems = "center";
  div.style.gap = "12px";
  div.style.padding = "6px 0";
}

// Editable row with radios
function makeRow({ name, status = null }) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.name = name;
  styleRow(div);

  const span = document.createElement("span");
  span.className = "name";
  span.textContent = name;
  span.style.justifySelf = "start";

  const labelP = document.createElement("label");
  Object.assign(labelP.style, {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    justifySelf: "center",
  });
  const inputP = document.createElement("input");
  inputP.type = "radio";
  inputP.name = name;
  inputP.value = "present";
  if (status === "present") inputP.checked = true;
  labelP.appendChild(inputP);
  labelP.appendChild(document.createTextNode(" Present"));

  const labelA = document.createElement("label");
  Object.assign(labelA.style, {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    justifySelf: "start",
  });
  const inputA = document.createElement("input");
  inputA.type = "radio";
  inputA.name = name;
  inputA.value = "absent";
  if (status === "absent") inputA.checked = true;
  labelA.appendChild(inputA);
  labelA.appendChild(document.createTextNode(" Absent"));

  div.appendChild(span);
  div.appendChild(labelP);
  div.appendChild(labelA);

  const submitBtn = document.getElementById("btnMark");
  form.insertBefore(div, submitBtn);
}

// Read-only row with icon + word
function makeStatusLine({ name, status }) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.name = name;
  styleRow(div);

  const spanName = document.createElement("span");
  spanName.className = "name";
  spanName.textContent = name;
  spanName.style.justifySelf = "start";

  const spanIcon = document.createElement("span");
  spanIcon.textContent = status === "present" ? "✅" : "❌";
  spanIcon.style.justifySelf = "center";

  const spanWord = document.createElement("span");
  spanWord.textContent = status === "present" ? " present" : " absent";
  spanWord.style.justifySelf = "start";

  div.appendChild(spanName);
  div.appendChild(spanIcon);
  div.appendChild(spanWord);

  const submitBtn = document.getElementById("btnMark");
  form.insertBefore(div, submitBtn);
}

// Search
async function onSearch() {
  const date = attDate.value;
  if (!date) return alert("Pick a date");

  summaryBox.innerHTML = "";

  try {
    // If your server expects GET, use:
    // const res = await axios.get(`${API_BASE}?date=${encodeURIComponent(date)}`);
    const res = await axios.post(API_BASE, { date });
    const { data, filled } = res.data;

    clearRows();

    if (filled && Array.isArray(data) && data.length) {
      btnMark.style.display = "none";
      data.forEach((item) => makeStatusLine(item));
    } else {
      btnMark.style.display = "inline-block";
      DEFAULT_NAMES.forEach((name) => makeRow({ name }));
    }
  } catch (e) {
    console.error(e);
    alert("Failed to fetch date sheet");
  }
}

// Mark Attendance
async function onSubmitAttendanceAttendance(e) {
  e.preventDefault();

  const date = attDate.value || new Date().toISOString().slice(0, 10);
  const rows = Array.from(document.querySelectorAll(".row"));
  if (!rows.length) return alert("Click Search first.");

  const records = rows.map((row) => {
    const name =
      row.dataset.name || row.querySelector(".name").textContent.trim();
    const checked = row.querySelector('input[type="radio"]:checked');
    const status = checked ? checked.value : null;
    return { name, status };
  });

  try {
    const res = await axios.post(`${API_BASE}/mark`, { date, records });
    alert("Attendance saved");

    btnMark.style.display = "none";
    const saved = res.data?.data || [];
    clearRows();
    saved.forEach((item) => makeStatusLine(item));
  } catch (e) {
    console.error(e);
    alert("Failed to save attendance");
  }
}

// 3) Fetch Summary
async function onFetchReport() {
  try {
    const res = await axios.get(`${API_BASE}/summary`);
    const { students } = res.data;

    summaryBox.innerHTML = "";

    (students || []).forEach((s) => {
      const line = document.createElement("div");
      const a = document.createElement("span");
      a.textContent = s.name;
      const b = document.createElement("span");
      b.textContent = ` ${s.present}/${s.totalDays} `;
      const c = document.createElement("span");
      c.textContent = `${s.percentage} %`;
      line.appendChild(a);
      line.appendChild(b);
      line.appendChild(c);
      summaryBox.appendChild(line);
    });
  } catch (e) {
    console.error(e);
    alert("Failed to fetch summary");
  }
}
