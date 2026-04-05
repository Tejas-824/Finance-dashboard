import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import validate from "../middleware/validateMiddleware.js";
import { loginValidation, registerValidation } from "../validations/authValidation.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/me", protect, getMe);

export default router;