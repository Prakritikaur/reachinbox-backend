const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Temporary mock data — replace with Gmail API or IMAP logic later
    const emails = [
      {
        id: 1,
        subject: "Project update",
        sender: "teammate@example.com",
        body: "Hey, can you send me the latest project report?",
      },
      {
        id: 2,
        subject: "Meeting Reminder",
        sender: "manager@example.com",
        body: "Don’t forget our 4 PM sync-up meeting.",
      },
    ];

    res.json({ emails });
  } catch (error) {
    console.error("Error syncing emails:", error);
    res.status(500).json({ error: "Failed to sync emails." });
  }
});

module.exports = router;
