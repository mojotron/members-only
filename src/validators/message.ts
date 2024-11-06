import { body } from "express-validator";

const messageValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("message title must not be empty")
    .isString()
    .withMessage("message title must be string")
    .isLength({ min: 3, max: 50 })
    .withMessage("message title must be between 3 and 50 characters long")
    .escape(),

  body("text")
    .trim()
    .notEmpty()
    .withMessage("message body must not be empty")
    .isString()
    .withMessage("message body must be string")
    .isLength({ min: 10, max: 1000 })
    .withMessage("message body must be between 10 and 1000 characters long")
    .escape(),
];

export default messageValidator;
