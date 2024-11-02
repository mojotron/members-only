import { body } from "express-validator";

const logInValidators = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email must not be empty")
    .isEmail()
    .withMessage("invalid email format")
    .normalizeEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password must not be empty")
    .isString()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/)
    .withMessage(
      "password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&"
    )
    .escape(),
];

export default logInValidators;
