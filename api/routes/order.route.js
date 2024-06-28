import express from "express";
import { verifyToke } from "../middleware/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToke, getOrders);
router.post("/create-payment-intent/:id", verifyToke, intent);
router.put("/", verifyToke, confirm);

export default router;
