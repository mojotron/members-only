import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const indexView = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render("pages/index");
};

const signUpView = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render("pages/sign-up-form", {
    actionPath: `/sign-up`,
    values: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    errors: [],
  });
};

const logInView = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render("pages/log-in-form", {
    actionPath: `/log-in`,
    values: {
      email: "",
      password: "",
    },
    errors: [],
  });
};

export { indexView, signUpView, logInView };
