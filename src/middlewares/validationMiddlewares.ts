import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

const signUpValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = result.array().map((err) => err.msg);
    return res.status(StatusCodes.BAD_REQUEST).render("pages/sign-up-form", {
      actionPath: `/sign-up`,
      values: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
      },
      errors: errorMessages,
    });
  }
  return next();
};

const logInValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errorMessages = result.array().map((err) => err.msg);
    return res.status(StatusCodes.OK).render("pages/log-in-form", {
      actionPath: `/log-in`,
      values: {
        email: req.body.email,
        password: req.body.password,
      },
      errors: errorMessages,
    });
  }
  return next();
};

export { signUpValidation, logInValidation };
