import express from "express";
import {
  getCategorySummary,
  getMonthlySummary,
  getSummary
} from "../controllers/summaryController.js";
import protect from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, allowRoles("viewer", "analyst", "admin"), getSummary);
router.get("/monthly", protect, allowRoles("viewer", "analyst", "admin"), getMonthlySummary);
router.get("/category", protect, allowRoles("viewer", "analyst", "admin"), getCategorySummary);

export default router;