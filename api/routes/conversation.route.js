import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { verifyToke } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToke, getConversations);
router.post("/", verifyToke, createConversation);
router.get("/single/:id", verifyToke, getSingleConversation);
router.put("/:id", verifyToke, updateConversation);

export default router;
