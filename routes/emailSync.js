import express from "express";
import { syncEmails } from "../controllers/emailSyncController.js";

const router = express.Router();

// GET or POST depending on how you fetch emails
router.get("/", syncEmails);

export default router;
