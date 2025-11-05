import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
const INTERESTED_WEBHOOK = process.env.INTERESTED_WEBHOOK;

export async function notifyInterested(emailDoc: any) {
  try {
    // Slack
    if (SLACK_WEBHOOK) {
      const payload = {
        text: `:star: *Interested email* from ${emailDoc.from}\n*Subject:* ${emailDoc.subject}\n*Account:* ${emailDoc.account}`
      };
      await fetch(SLACK_WEBHOOK, { method: "POST", body: JSON.stringify(payload), headers: { "Content-Type": "application/json" } });
    }

    // External webhook
    if (INTERESTED_WEBHOOK) {
      await fetch(INTERESTED_WEBHOOK, { method: "POST", body: JSON.stringify({ event: "interested_email", email: emailDoc }), headers: { "Content-Type": "application/json" } });
    }
  } catch (err) {
    console.error("Notify error", err);
  }
}
