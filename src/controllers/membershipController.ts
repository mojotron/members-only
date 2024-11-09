import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type { AppUserType } from "../types/userTypes.js";

const membershipView = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user as AppUserType;
  if (currentUser.member) {
    res.status(StatusCodes.OK).render("error", {
      isAuth: req.isAuthenticated(),
      heading: `Already Member`,
      message: `You already answered secret question and became member!`,
    });
  }

  const question = `What is the name of authentication library used in this project?`;

  return res.status(StatusCodes.OK).render("pages/membership", {
    isAuth: req.isAuthenticated(),
    question,
    actionPath: `/membership`,
    values: {
      answer: "",
    },
    errors: [],
  });
};

const membershipCheck = () => {};

export { membershipView, membershipCheck };
