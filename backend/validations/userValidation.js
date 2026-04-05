import { body } from "express-validator";

export const createUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role"),
  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Invalid status")
];

export const updateRoleValidation = [
  body("role")
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Invalid role")
];

export const updateStatusValidation = [
  body("status")
    .isIn(["active", "inactive"])
    .withMessage("Invalid status")
];