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

export { indexView, signUpView };