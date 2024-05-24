const createUserValidation = {
  username: {
    in: ['body'],
  },
  password: {
    in: ['body'],
  },
};

export default createUserValidation;
