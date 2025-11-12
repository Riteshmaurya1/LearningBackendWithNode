const API_BASE = "https://attendance-backend-zwx1.onrender.com/student/attendance";

// Elements
const attDate = document.getElementById("attDate");
const btnSearch = document.getElementById("btnSearch");
const btnFetchReport = document.getElementById("btnFetchReport");
const form = document.getElementById("attForm");
const btnMark = document.getElementById("btnMark");
const summaryBox = document.getElementById("summary");

// Hide mark button initially
btnMark.style.display = "none";

// Default student list
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
form.addEventListener("submit", onSubmitAttendance);
btnFetchReport.addEventListener("click", onFetchReport);

// Helpers
function clearRows() {
  document.querySelectorAll(".row").forEach((el) => el.remove());
}

function makeRow(name, status = null) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.name = name;

  const span = document.createElement("span");
  span.textContent = name;

  const present = document.createElement("input");
  present.type = "radio";
  present.name = name;
  present.value = "present";
  if (status === "present") present.checked = true;

  const absent = document.createElement("input");
  absent.type = "radio";
  absent.name = name;
  absent.value = "absent";
  if (status === "absent") absent.checked = true;

  const labelP = document.createElement("label");
  labelP.appendChild(present);
  labelP.append(" Present");

  const labelA = document.createElement("label");
  labelA.appendChild(absent);
  labelA.append(" Absent");

  div.append(span, labelP, labelA);
  form.insertBefore(div, btnMark);
}

function makeStatusLine(name, status) {
  const div = document.createElement("div");
  div.className = "row";
  div.dataset.name = name;

  div.innerHTML = `
    <span>${name}</span>
    <span>${status === "present" ? "✅" : "❌"}</span>
    <span>${status}</span>
  `;
  form.insertBefore(div, btnMark);
}

// Fetch attendance for a date
async function onSearch() {
  const date = attDate.value;
  if (!date) return alert("Select a date first!");

  summaryBox.innerHTML = "";
  clearRows();

  try {
    const res = await axios.post(API_BASE, { date });
    const { data, filled } = res.data;

    if (filled && Array.isArray(data) && data.length) {
      // Already filled → show read-only summary
      btnMark.style.display = "none";
      data.forEach(({ name, status }) => makeStatusLine(name, status));
    } else {
      // Not filled → show editable rows
      btnMark.style.display = "inline-block";
      DEFAULT_NAMES.forEach((name) => makeRow(name));
    }
  } catch (err) {
    console.error(err);
    alert("Failed to fetch attendance data");
  }
}

// Submit attendance
async function onSubmitAttendance(e) {
  e.preventDefault();

  const date = attDate.value || new Date().toISOString().slice(0, 10);
  const rows = Array.from(document.querySelectorAll(".row"));
  if (!rows.length) return alert("Click Search first.");

  const records = rows.map((row) => {
    const name = row.dataset.name;
    const checked = row.querySelector("input:checked");
    return { name, status: checked ? checked.value : null };
  });

  try {
    const res = await axios.post(`${API_BASE}/mark`, { date, records });
    alert("Attendance saved successfully!");

    btnMark.style.display = "none";
    clearRows();
    (res.data?.data || []).forEach(({ name, status }) =>
      makeStatusLine(name, status)
    );
  } catch (err) {
    console.error(err);
    alert("Failed to save attendance");
  }
}

// Fetch summary report
async function onFetchReport() {
  try {
    const res = await axios.get(`${API_BASE}/summary`);
    const { students } = res.data;
    summaryBox.innerHTML = "";

    (students || []).forEach((s) => {
      const line = document.createElement("div");
      line.style.display = "flex";
      line.style.justifyContent = "space-between";
      line.style.padding = "6px 0";
      line.style.borderBottom = "1px solid #eee";

      const name = document.createElement("span");
      name.textContent = s.name;

      const stats = document.createElement("span");
      stats.textContent = `${s.present}/${s.totalDays} (${s.percentage}%)`;

      line.append(name, stats);
      summaryBox.appendChild(line);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to fetch summary");
  }
}
