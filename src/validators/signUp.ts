import { body } from "express-validator";

const signUpValidators = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("first name must not be empty")
    .isString()
    .withMessage("first name must be string")
    .isLength({ min: 3, max: 25 })
    .withMessage("first name must be between 3 and 25 characters long")
    .escape(),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("last name must not be empty")
    .isString()
    .withMessage("last name must be string")
    .isLength({ min: 3, max: 25 })
    .withMessage("last name must be between 3 and 25 characters long")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("emil must not be empty")
    .isString()
    .withMessage("")
    .isEmail()
    .withMessage(""),

  body("password"),

  body("confirmPassword"),
];

export default signUpValidators;
