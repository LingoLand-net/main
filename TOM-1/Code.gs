function doPost(e) {
  var action = e.parameter.action;
  
  if (action == "checkCredentials") {
    var email = e.parameter.email;
    var password = e.parameter.password;
    var result = doSearch(email, password);
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.TEXT);
  }
}

function doSearch(email, password) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Sheet1");

  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) { // Start from 1 to skip header row
    if (data[i][0] === email && data[i][1] === password) {
      return "Success"; // Credentials found
    }
  }
  
  return "Failure"; // Credentials not found
}
