const Imap = require('imap-simple');
const { simpleParser } = require('mailparser');
require('dotenv').config();

const config = {
  imap: {
    user: process.env.IMAP_USER,
    password: process.env.IMAP_PASS,
    host: process.env.IMAP_HOST,
    port: process.env.IMAP_PORT,
    tls: true,
    authTimeout: 3000
  }
};

async function fetchEmails() {
  try {
    const connection = await Imap.connect(config);
    await connection.openBox('INBOX');
    console.log("Connected to IMAP ✅");

    const delay = 30 * 24 * 3600 * 1000; // last 30 days
    const since = new Date(Date.now() - delay);
    const searchCriteria = [['SINCE', since.toISOString().split('T')[0]]];
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    console.log(`Fetched ${messages.length} emails 📩`);

    for (let message of messages) {
      const all = message.parts.find(p => p.which === 'TEXT');
      const parsed = await simpleParser(all.body);

      console.log({
        subject: parsed.subject,
        from: parsed.from?.text,
        date: parsed.date,
        text: parsed.text?.substring(0, 100) // short preview
      });
    }

    connection.end();
  } catch (error) {
    console.error("Error fetching emails:", error);
  }
}

fetchEmails();

