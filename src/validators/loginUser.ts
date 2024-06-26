const createLoginValidation = {
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

export default createLoginValidation;
