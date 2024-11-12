import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { selectLatestMessages } from "../db/queries.js";
import { timeDistance } from "../utils/formatTime.js";
import { AppUserType } from "../types/userTypes.js";
import { MESSAGE_LIMIT } from "../constants/messageConstants.js";

const indexView = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.query;

    const currentUser = req.user as AppUserType;
    const currentUserIsMember = currentUser?.member || false;

    const pageNumber = page !== undefined ? parseInt(page as string) : 1;
    const messageResult = await selectLatestMessages(pageNumber, MESSAGE_LIMIT);

    const modifiedMessages = messageResult.map((msg) => ({
      ...msg,
      createdAt: timeDistance(msg.createdAt),
      isMember: currentUserIsMember,
      isCurrentAuthor: msg.userUid === currentUser?.userUid,
    }));

    return res.status(StatusCodes.OK).render("pages/index", {
      isAuth: req.isAuthenticated(),
      messages: modifiedMessages,
      currentPage: pageNumber,
      pageLimit: MESSAGE_LIMIT,
    });
  } catch (error) {
    return next(error);
  }
};

const signUpView = (req: Request, res: Response) => {
  if (req.isAuthenticated()) return res.status(StatusCodes.OK).redirect("/");

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
  if (req.isAuthenticated()) return res.status(StatusCodes.OK).redirect("/");

  return res.status(StatusCodes.OK).render("pages/log-in-form", {
    actionPath: `/log-in`,
    values: {
      email: "",
      password: "",
    },
    errors: [],
  });
};

const aboutView = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render("pages/about", {
    isAuth: req.isAuthenticated(),
  });
};

export { indexView, signUpView, logInView, aboutView };
