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
  const RECIPIENT = REQUEST_EMAIL_TO || 'lingolandcoursebooks@gmail.com';

  const requestType = row.request_type || row.type || 'General request';
  const isAnonymous = row.anonymous === true || String(row.anonymous).toLowerCase() === 'true';
  const displayName = isAnonymous ? 'Anonymous Student' : (row.name || 'Not provided');

  let rawMessage = String(row.message || '(no message)');
  rawMessage = rawMessage.replace(/\\n/g, '\n');
  rawMessage = rawMessage.replace(/\?n/g, '?\n');

  const contact = String(row.contact || '').trim();
  const timestamp = formatTimestamp_(row.timestamp);
  const cleanMessageHtml = toMultilineHtml_(rawMessage);
  const contactHtml = toContactHtml_(contact);

  const subject = `[LingoVille Request] ${requestType}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LingoVille Request</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#1f2d2c;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; background:#f4f6f5;">
    <tr>
      <td align="center" style="padding:16px 10px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%; max-width:640px; border-collapse:collapse; background:#ffffff; border:1px solid #dde8e7; border-top:4px solid #f5a93b;">
          <tr>
            <td style="padding:14px 18px; background:#007b7f; color:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="font-size:18px; font-weight:700;">LingoVille English Teaching Center</td>
                  <td align="right" style="font-size:12px; color:#d9f0ef; white-space:nowrap;">${escapeHtml_(timestamp)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 18px 8px; font-size:16px; font-weight:700; color:#1f2d2c;">New student request</td>
          </tr>

          <tr>
            <td style="padding:0 18px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; font-size:14px;">
                <tr>
                  <td style="padding:9px 0; width:140px; color:#536867; font-weight:600; border-bottom:1px solid #edf3f2;">Request type</td>
                  <td style="padding:9px 0; color:#1f2d2c; font-weight:600; border-bottom:1px solid #edf3f2;">${escapeHtml_(requestType)}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; color:#536867; font-weight:600; border-bottom:1px solid #edf3f2;">Student</td>
                  <td style="padding:9px 0; color:#1f2d2c; border-bottom:1px solid #edf3f2;">${escapeHtml_(displayName)}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0; color:#536867; font-weight:600;">Contact</td>
                  <td style="padding:9px 0; color:#1f2d2c;">${contactHtml}</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 18px 0; font-size:12px; text-transform:uppercase; letter-spacing:0.7px; color:#536867; font-weight:700;">Message</td>
          </tr>
          <tr>
            <td style="padding:8px 18px 16px;">
              <div style="background:#f8fbfb; border:1px solid #d8e8e6; border-left:4px solid #00aca8; padding:12px; font-size:14px; line-height:1.45; color:#1f2d2c;">
                ${cleanMessageHtml || '<em>No message provided</em>'}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:10px 18px; border-top:1px solid #edf3f2; background:#fafcfc; font-size:11px; color:#6d807f;">
              Sent from LingoVille survey form.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const plainBody = [
    'LingoVille - New student request',
    '',
    `Request type: ${requestType}`,
    `Student: ${displayName}`,
    `Message: ${rawMessage}`,
    `Contact: ${contact || 'Not provided'}`,
    `Timestamp: ${timestamp}`,
    '',
    'Sent from LingoVille survey form.'
  ].join('\n');

  const options = {
    to: RECIPIENT,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: 'LingoVille English Teaching Center'
  };

  const replyEmail = extractEmail_(contact);
  if (replyEmail) {
    options.replyTo = replyEmail;
  }

  MailApp.sendEmail(options);
}

function formatTimestamp_(timestamp) {
  const date = new Date(timestamp || '');
  if (isNaN(date.getTime())) {
    return String(timestamp || '');
  }

  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toMultilineHtml_(value) {
  const escaped = escapeHtml_(value).trim();
  return escaped ? escaped.replace(/\r?\n/g, '<br>') : '';
}

function extractEmail_(value) {
  const text = String(value || '').trim();
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0] : '';
}

function toContactHtml_(value) {
  const text = String(value || '').trim();
  if (!text) {
    return '<span style="color:#8BA29E;">Not provided</span>';
  }

  const safe = escapeHtml_(text);
  const email = extractEmail_(text);
  if (email) {
    const safeEmail = escapeHtml_(email);
    return `<a href="mailto:${safeEmail}" style="color:#007b7f; text-decoration:none; font-weight:600;">${safe}</a>`;
  }

  const phone = extractPhone_(text);
  if (phone) {
    return `<a href="tel:${phone}" style="color:#007b7f; text-decoration:none; font-weight:600;">${safe}</a>`;
  }

  return safe;
}

function extractPhone_(value) {
  const text = String(value || '').trim();
  if (!/^\+?[\d\s\-()]+$/.test(text)) {
    return '';
  }

  const normalized = text.replace(/[^\d+]/g, '');
  return normalized.length >= 7 ? normalized : '';
}