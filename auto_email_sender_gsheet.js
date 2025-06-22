// Google Sheets Auto Email Sender using Google Apps Script
// Trigger: Time-based trigger (e.g., every day at 8 AM)

function sendReminderEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ReminderList");
  const data = sheet.getDataRange().getValues();
  const today = new Date();
  
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const name = row[0];
    const email = row[1];
    const dueDate = new Date(row[2]);
    const status = row[3];

    // Check if email needs to be sent
    if (status !== "SENT" && isToday(dueDate, today)) {
      const subject = `Reminder: Action Required by ${name}`;
      const message = `Hi ${name},\n\nThis is a reminder that your task is due today (${dueDate.toDateString()}).\n\nPlease take necessary action.\n\nThank you!`;

      MailApp.sendEmail(email, subject, message);
      sheet.getRange(i + 1, 4).setValue("SENT");
    }
  }
}

function isToday(dueDate, today) {
  return dueDate.getFullYear() === today.getFullYear() &&
         dueDate.getMonth() === today.getMonth() &&
         dueDate.getDate() === today.getDate();
}

// Note: Add a time-based trigger manually via Apps Script UI > Triggers
// Set to run daily or hourly depending on use case
