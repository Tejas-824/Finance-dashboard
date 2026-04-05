import express from "express";
import {
  createUserByAdmin,
  getUserById,
  getUsers,
  updateUserRole,
  updateUserStatus
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import allowRoles from "../middleware/roleMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import {
  createUserValidation,
  updateRoleValidation,
  updateStatusValidation
} from "../validations/userValidation.js";

const router = express.Router();

router.post("/", protect, allowRoles("admin"), createUserValidation, validate, createUserByAdmin);
router.get("/", protect, allowRoles("admin"), getUsers);
router.get("/:id", protect, allowRoles("admin"), getUserById);
router.patch("/:id/role", protect, allowRoles("admin"), updateRoleValidation, validate, updateUserRole);
router.patch("/:id/status", protect, allowRoles("admin"), updateStatusValidation, validate, updateUserStatus);

export default router;