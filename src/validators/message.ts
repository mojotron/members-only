import { body } from 'express-validator';

const validator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('first name is required')
    .matches(/[a-z0-9-_']/)
    .withMessage("invalid character (letters, numbers, -, _, ')")
    .isLength({ min: 3, max: 20 })
    .withMessage('first name must be between 3 and 20 character long')
    .escape(),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('last name is required')
    .matches(/[a-z0-9-_']/)
    .withMessage("invalid character (letters, numbers, -, _, ')")
    .isLength({ min: 3, max: 20 })
    .withMessage('last name must be between 3 and 20 character long')
    .escape(),

  
];

export default validator;
