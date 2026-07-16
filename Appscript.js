function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var body = JSON.parse(e.postData.contents);
  var records = body.records;

  records.forEach(function (r) {
    sheet.appendRow([r.name, r.standard, r.date, r.status, r.faculty]);
  });

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    return jsonResponse({ records: [] });
  }

  var headers = data[0].map(function (h) { return h.toString().trim().toLowerCase(); });
  var dateIdx = headers.indexOf('date');
  var standardIdx = headers.indexOf('standard');
  var nameIdx = headers.indexOf('name');
  var statusIdx = headers.indexOf('status');
  var facultyIdx = headers.indexOf('faculty');

  var requestedDate = e.parameter.date;
  var results = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var cellDateStr = formatAsDate(row[dateIdx]);

    if (cellDateStr === requestedDate) {
      results.push({
        date: cellDateStr,
        standard: standardIdx > -1 ? row[standardIdx] : "",
        name: nameIdx > -1 ? row[nameIdx] : "",
        status: statusIdx > -1 ? row[statusIdx] : "",
        faculty: facultyIdx > -1 ? row[facultyIdx] : ""
      });
    }
  }

  return jsonResponse({ records: results });
}

function formatAsDate(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  return value.toString().trim();
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}