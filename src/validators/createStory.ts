const createStoryValidator = {
  title: {
    notEmpty: {
      errorMessage: 'story title must not be empty',
    },
    isString: {
      errorMessage: 'story title must be string',
    },
    isLength: {
      options: { min: 5, max: 50 },
      errorMessage: 'story title must be between 5 and 50 characters',
    },
    trim: true,
    escape: true,
  },
  body: {
    notEmpty: {
      errorMessage: 'story body must not be empty',
    },
    isString: {
      errorMessage: 'story body must be string',
    },
    isLength: {
      options: { min: 10, max: 500 },
      errorMessage: 'story body must be between 5 and 500 characters',
    },
    trim: true,
    escape: true,
  },
};

export default createStoryValidator;
