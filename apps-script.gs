/* ============================================================
   DATALYZER · Google Apps Script — Leads Webhook
   Hoja: https://docs.google.com/spreadsheets/d/1ftqN88yXqxX7yrmlAfexK2F9fmYYcivM8q_Td0gNW_Y

   INSTRUCCIONES DE DEPLOY:
   1. Abrí la hoja → Extensiones → Apps Script
   2. Borrá el código de inicio y pegá TODO este archivo
   3. Guardá (Ctrl+S)
   4. Deploy → New deployment
      Type: Web app
      Execute as: Me
      Who has access: Anyone
   5. Autorizá los permisos cuando te los pida
   6. Copiá el "Web app URL" que aparece
   7. Pegalo en config.js → window.SHEET_WEBHOOK = '...'
   8. Guardá config.js y redeploy en Vercel
============================================================ */

var SHEET_ID = '1ftqN88yXqxX7yrmlAfexK2F9fmYYcivM8q_Td0gNW_Y';
var HEADERS  = ['Fecha y hora', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Vertical', 'URL de origen'];

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getActiveSheet();

    // Crear cabeceras si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight('bold').setBackground('#e8f5e9').setFontColor('#1b5e20');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160); // Fecha
      sheet.setColumnWidth(2, 160); // Nombre
      sheet.setColumnWidth(3, 200); // Email
      sheet.setColumnWidth(4, 160); // Teléfono
      sheet.setColumnWidth(5, 180); // Empresa
      sheet.setColumnWidth(6, 130); // Vertical
      sheet.setColumnWidth(7, 280); // URL
      // Teléfono como texto plano (evita que + se interprete como fórmula)
      sheet.getRange('D:D').setNumberFormat('@');
    }

    var data = JSON.parse(e.postData.contents);

    // Insertar fila
    var nextRow = sheet.getLastRow() + 1;
    sheet.appendRow([
      data.fecha    || new Date().toLocaleString('es-AR'),
      data.nombre   || '',
      data.email    || '',
      data.tel      || '',
      data.empresa  || '',
      data.vertical || '',
      data.url      || ''
    ]);
    // Forzar texto plano en celda de teléfono (evita #ERROR! con números +54...)
    sheet.getRange(nextRow, 4).setNumberFormat('@');

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Permite verificar que el endpoint está activo
function doGet(e) {
  return ContentService.createTextOutput('Datalyzer Leads Webhook · Activo ✓');
}
