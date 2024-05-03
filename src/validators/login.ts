import { body } from 'express-validator';

const validator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username is required')
    .matches(/[a-z0-9-_']/)
    .withMessage("invalid character (letters, numbers, -, _, ')")
    .isLength({ min: 3, max: 20 })
    .withMessage('username must be between 3 and 20 character long')
    .escape(),

  body('password')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 character long')
    .escape(),
];

export default validator;
