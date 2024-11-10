import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import type { AppUserType } from "../types/userTypes.js";
import { matchedData } from "express-validator";
import { updateUserToMember } from "../db/queries.js";

const membershipView = (req: Request, res: Response, next: NextFunction) => {
  const currentUser = req.user as AppUserType;
  if (currentUser.member) {
    res.status(StatusCodes.OK).render("error", {
      isAuth: req.isAuthenticated(),
      heading: `Already Member`,
      message: `You already answered secret question and became member!`,
    });
  }

  return res.status(StatusCodes.OK).render("pages/membership", {
    isAuth: req.isAuthenticated(),
    question: process.env.MEMBERSHIP_QUESTION,
    actionPath: `/membership`,
    values: {
      answer: "",
    },
    errors: [],
  });
};

const membershipCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { answer } = matchedData(req);
    const isCorrectAnswer = answer === process.env.MEMBERSHIP_ANSWER;

    if (!isCorrectAnswer) {
      return res.status(StatusCodes.BAD_REQUEST).render("pages/membership", {
        isAuth: req.isAuthenticated(),
        question: process.env.MEMBERSHIP_QUESTION,
        actionPath: `/membership`,
        values: {
          answer: "",
        },
        errors: ["Incorrect answer, try again"],
      });
    }

    const currentUser = req.user as AppUserType;

    await updateUserToMember(currentUser.userUid);

    return res.status(StatusCodes.OK).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

export { membershipView, membershipCheck };
