const SHEET_NAME = 'Submissions';
const RAW_SHEET_NAME = 'Raw JSON';
const REQUEST_EMAIL_TO = 'besssem@lingo-land.net';
const PROP_SPREADSHEET_ID = 'SPREADSHEET_ID';

function doGet() {
  const spreadsheet = getSpreadsheet_();
  return jsonResponse_({
    ok: true,
    message: 'Lingo Land survey endpoint is running.',
    spreadsheetUrl: spreadsheet.getUrl(),
    sheets: [SHEET_NAME, RAW_SHEET_NAME]
  });
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const spreadsheet = getSpreadsheet_();
    const row = buildRow_(payload);
    const rawSheet = getOrCreateSheet_(spreadsheet, RAW_SHEET_NAME);
    const sheet = getOrCreateSheet_(spreadsheet, SHEET_NAME);

    ensureHeader_(sheet, [
      'timestamp',
      'form_type',
      'name',
      'anonymous',
      'student',
      'course',
      'teacher',
      'q_fun',
      'q_clarity',
      'q_diff',
      'q_explain',
      'stars',
      'liked',
      'improve',
      'request_type',
      'message',
      'contact',
      'raw_json'
    ]);
    ensureHeader_(rawSheet, ['timestamp', 'form_type', 'raw_json']);

    sheet.appendRow([
      row.timestamp,
      row.form_type,
      row.name,
      row.anonymous,
      row.student,
      row.course,
      row.teacher,
      row.q_fun,
      row.q_clarity,
      row.q_diff,
      row.q_explain,
      row.stars,
      row.liked,
      row.improve,
      row.request_type,
      row.message,
      row.contact,
      row.raw_json
    ]);
    rawSheet.appendRow([row.timestamp, row.form_type, row.raw_json]);

    if (row.form_type === 'request') {
      sendRequestEmail_(row);
    }

    return jsonResponse_({ ok: true, saved: true, sheet: sheet.getName(), rawSheet: rawSheet.getName() });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, saved: false, error: String(error) });
  }
}

function parsePayload_(e) {
  const raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
  if (!raw) {
    throw new Error('Missing request body');
  }

  try {
    const data = JSON.parse(raw);
    if (data && typeof data === 'object') {
      return data;
    }
  } catch (error) {
    throw new Error('Invalid JSON body: ' + error.message);
  }

  throw new Error('Request body is not a JSON object');
}

function buildRow_(payload) {
  const isRequest = !!payload.message || (!!payload.type && payload.student === undefined);
  const now = new Date().toISOString();

  return {
    timestamp: payload.timestamp || now,
    form_type: isRequest ? 'request' : 'review',
    name: payload.name || 'Anonymous',
    anonymous: Boolean(payload.anonymous),
    student: payload.student || '',
    course: payload.course || '',
    teacher: payload.teacher || '',
    q_fun: payload.q_fun || '',
    q_clarity: payload.q_clarity || '',
    q_diff: payload.q_diff || '',
    q_explain: payload.q_explain || '',
    stars: payload.stars || '',
    liked: payload.liked || '',
    improve: payload.improve || '',
    request_type: payload.type || '',
    message: payload.message || '',
    contact: payload.contact || '',
    raw_json: JSON.stringify(payload)
  };
}

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const spreadsheetId = props.getProperty(PROP_SPREADSHEET_ID);

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    props.setProperty(PROP_SPREADSHEET_ID, active.getId());
    return active;
  }

  const created = SpreadsheetApp.create('Lingo Land Survey Responses');
  props.setProperty(PROP_SPREADSHEET_ID, created.getId());
  return created;
}

function getOrCreateSheet_(spreadsheet, sheetName) {
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeader_(sheet, keys) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow(keys);
  sheet.setFrozenRows(1);
}

function jsonResponse_(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendRequestEmail_(row) {
  const subject = `[LingoLand] New request: ${row.request_type || 'General request'}`;
  const body = [
    'You received a new student request from the LingoLand survey.',
    '',
    `Timestamp: ${row.timestamp}`,
    `Name: ${row.name}`,
    `Anonymous: ${row.anonymous}`,
    `Request type: ${row.request_type}`,
    `Message: ${row.message}`,
    `Contact: ${row.contact}`,
    '',
    'Raw JSON:',
    row.raw_json
  ].join('\n');

  MailApp.sendEmail({
    to: REQUEST_EMAIL_TO,
    subject: subject,
    body: body
  });
}