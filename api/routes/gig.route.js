import express from "express";
import { verifyToke } from "../middleware/jwt.js";
import { createGig, deleteAllGigs, getGig, getGigs } from "../controllers/gig.controller.js";

const router = express.Router();

router.post("/", verifyToke, createGig);

router.get("/single/:id", getGig);
router.get("/", getGigs);
router.delete("/", verifyToke, deleteAllGigs);
export default router;
