// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE (see setup instructions)
const SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

const students = [
  { name: "Yazhini Shree", standard: "1st", group: "a1" },
  { name: "Aarisha", standard: "2nd", group: "a2" },
  { name: "Aasira Fathima", standard: "3rd", group: "a3" },
  { name: "Pawan Varman", standard: "3rd", group: "a4" },
  { name: "Sekh Anyash", standard: "3rd", group: "a5" },
  { name: "Jussica", standard: "6th", group: "a6" },
  { name: "Mariya", standard: "6th", group: "a7" },
  { name: "Jahfar Namoos", standard: "6th", group: "a8" },
  { name: "MD.Thufail", standard: "6th", group: "a9" },
  { name: "Siddharth", standard: "6th", group: "a10" },
  { name: "Aashika", standard: "7th", group: "a11" },
  { name: "Kider Mohammed", standard: "7th", group: "a12" },
  { name: "Afrin", standard: "8th", group: "a13" },
  { name: "Devauk", standard: "8th", group: "a14" },
  { name: "Umar", standard: "8th", group: "a15" },
  { name: "Rifa Fathima", standard: "9th", group: "a16" },
  { name: "Sana Fathima", standard: "9th", group: "a17" },
  { name: "Alvin", standard: "9th", group: "a18" },
  { name: "Afra Sherin", standard: "10th", group: "a19" },
  { name: "Varshini", standard: "10th", group: "a20" },
  { name: "Ibrahim", standard: "11th", group: "a21" },
  { name: "Shruti", standard: "12th", group: "a22" },
  { name: "Afran", standard: "12th", group: "a23" },
  { name: "Sathis Kumar", standard: "12th", group: "a24" }
];

function checkAttendance() {
  const dateVal = document.getElementById('reportDate').value;
  const faculty = document.getElementById('faculty').value.trim();
  const warning = document.getElementById('warning');

  if (!dateVal) {
    warning.textContent = "Please select the date.";
    warning.style.display = 'block';
    return;
  }
  if (!faculty) {
    warning.textContent = "Please enter the faculty incharge name.";
    warning.style.display = 'block';
    return;
  }

  let presentCount = 0;
  let absentCount = 0;
  let allMarked = true;
  const records = [];

  students.forEach(function (s) {
    const group = document.getElementsByName(s.group);
    let value = "";
    for (let j = 0; j < group.length; j++) {
      if (group[j].checked) value = group[j].value;
    }
    if (!value) {
      allMarked = false;
    } else if (value === 'present') {
      presentCount++;
    } else {
      absentCount++;
    }
    records.push({
      date: dateVal,
      standard: s.standard,
      name: s.name,
      status: value || "not marked",
      faculty: faculty
    });
  });

  if (!allMarked) {
    warning.textContent = "Please mark attendance (Present/Absent) for every student before submitting.";
    warning.style.display = 'block';
    return;
  }

  warning.style.display = 'none';
  document.getElementById('presentCount').textContent = presentCount;
  document.getElementById('absentCount').textContent = absentCount;

  submitToSheet(records);
}

function submitToSheet(records) {
  const status = document.getElementById('submitStatus');
  status.textContent = "Submitting...";
  status.style.color = "#444";

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: records })
  })
    .then(function () {
      status.textContent = "Attendance submitted successfully!";
      status.style.color = "green";
    })
    .catch(function (err) {
      status.textContent = "Submission failed. Check your internet connection.";
      status.style.color = "#b00020";
      console.error(err);
    });
}