import express from "express";
import {
  createRecord,
  deleteRecord,
  getRecordById,
  getRecords,
  updateRecord
} from "../controllers/recordController.js";
import protect from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { recordValidation } from "../validations/recordValidation.js";

const router = express.Router();

router.get("/", protect, allowRoles("analyst", "admin"), getRecords);
router.get("/:id", protect, allowRoles("analyst", "admin"), getRecordById);

router.post("/", protect, allowRoles("admin"), recordValidation, validate, createRecord);
router.patch("/:id", protect, allowRoles("admin"), recordValidation, validate, updateRecord);
router.delete("/:id", protect, allowRoles("admin"), deleteRecord);

export default router;