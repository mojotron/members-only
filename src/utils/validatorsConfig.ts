const createUserValidation = {
  firstName: {
    isString: {
      errorMessage: 'first name must be string',
    },
    notEmpty: {
      errorMessage: 'first name must not be empty',
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: 'first name must be between 3 and 20 characters',
    },
    trim: true,
    escape: true,
  },

  lastName: {
    isString: {
      errorMessage: 'last name must be string',
    },
    notEmpty: {
      errorMessage: 'last name must not be empty',
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: 'last name must be between 3 and 20 characters',
    },
    trim: true,
    escape: true,
  },

  username: {
    isString: {
      errorMessage: 'username must be string',
    },
    notEmpty: {
      errorMessage: 'username must not be empty',
    },
    isLength: {
      options: { min: 3, max: 20 },
      errorMessage: 'username must be between 3 and 20 characters',
    },
    trim: true,
    escape: true,
  },

  password: {
    isString: {
      errorMessage: 'password must be string',
    },
    notEmpty: {
      errorMessage: 'password must not be empty',
    },
    isLength: {
      options: { min: 6, max: 64 },
      errorMessage: 'password must be between 6 and 64 characters',
    },
    trim: true,
    escape: true,
  },
};

const createLoginValidation = {};

export { createUserValidation, createLoginValidation };
