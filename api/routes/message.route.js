import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToke } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToke, createMessage);
router.get("/:id", verifyToke, getMessages);

export default router;
