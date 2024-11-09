import { body } from "express-validator";

const membershipValidator = body("answer")
  .trim()
  .notEmpty()
  .withMessage("answer must not be empty")
  .isString()
  .withMessage("answer must be text")
  .escape();

export default membershipValidator;
