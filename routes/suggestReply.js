import express from "express";
import { getSuggestedReply } from "../controllers/suggestReplyController.js";

const router = express.Router();

// POST route to get AI-suggested reply
router.post("/", getSuggestedReply);

export default router;
