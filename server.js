require("dotenv").config();
const express = require("express");
const cors = require("cors");

const suggestReplyRoutes = require("./routes/suggestReply");
const emailSyncRoutes = require("./routes/emailSync");

const app = express();
app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/suggest-reply", suggestReplyRoutes);
app.use("/api/email-sync", emailSyncRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
