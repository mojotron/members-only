import { body, check } from "express-validator";

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
    .withMessage("email must not be empty")
    .isString()
    .withMessage("email must be string")
    .isEmail()
    .withMessage("email format is not valid")
    .normalizeEmail()
    .escape(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("password must not be empty")
    .isString()
    .withMessage("password must be string")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/)
    .withMessage(
      "password must be be minimum of 8 character and including uppercase letter, lowercase letter, number and special character @$!%*?&"
    )
    .escape(),

  check("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        return false;
      }
      return true;
    })
    .withMessage("password and custom password must be equal"),
];

export default signUpValidators;
