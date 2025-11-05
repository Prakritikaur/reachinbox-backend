import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.js";
import emailsRouter from "./routes/emails.js";
import suggestRouter from "./routes/suggestReply.js";
import { startIMAPSync } from "./services/imapService.js";
import { initElastic } from "./services/elastic.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/emails", emailsRouter);
app.use("/api/suggest-reply", suggestRouter);

const PORT = process.env.PORT ?? 5000;

(async () => {
  await initElastic(); // ensure ES index exists
  startIMAPSync();     // connect to all IMAP accounts (IDLE)
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
})();
