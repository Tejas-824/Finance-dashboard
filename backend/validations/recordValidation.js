import { body } from "express-validator";

export const recordValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("notes").optional().isString().withMessage("Notes must be text")
];