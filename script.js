function checkAttendance() {
  var totalGroups = 24;
  var presentCount = 0;
  var absentCount = 0;
  var allMarked = true;

  for (var i = 1; i <= totalGroups; i++) {
    var group = document.getElementsByName('a' + i);
    var marked = false;
    for (var j = 0; j < group.length; j++) {
      if (group[j].checked) {
        marked = true;
        if (group[j].value === 'present') {
          presentCount++;
        } else if (group[j].value === 'absent') {
          absentCount++;
        }
      }
    }
    if (!marked) {
      allMarked = false;
    }
  }

  var warning = document.getElementById('warning');
  if (!allMarked) {
    warning.style.display = 'block';
  } else {
    warning.style.display = 'none';
  }

  document.getElementById('presentCount').textContent = presentCount;
  document.getElementById('absentCount').textContent = absentCount;
}
