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
  story: {
    notEmpty: {
      errorMessage: 'story story must not be empty',
    },
    isString: {
      errorMessage: 'story story must be string',
    },
    isLength: {
      options: { min: 10, max: 500 },
      errorMessage: 'story story must be between 5 and 500 characters',
    },
    trim: true,
    escape: true,
  },
};

export default createStoryValidator;
