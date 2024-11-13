import { encode } from "node:querystring";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
// DB queries
import {
  insertMessage,
  selectMessagesByUserUid,
  selectMessageByUid,
  updateMessage,
  deleteMessageByUid,
  selectUser,
  selectMessagesByFilter,
  selectLatestMessages,
} from "../db/queries.js";
// types
import type { AppUserType } from "../types/userTypes.js";
import type { MessageCardType } from "../types/messagesTypes.js";
// helpers
import isMember from "../utils/isMember.js";
import { timeDistance, dateCreated } from "../utils/formatTime.js";
// constants
import { MESSAGE_LIMIT } from "../constants/messageConstants.js";

// GET
const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, page, filter, search } = req.query;
    const currentUser = req.user as AppUserType;
    const currentUserIsMember = isMember(req);

    const pageNumber = page !== undefined ? parseInt(page as string) : 1;
    // search filtering
    let messageResult: MessageCardType[] = [];
    let queryParams: { [key: string]: string | number } = {};

    if (user === "current") {
      // search for current user messages
      messageResult = await selectMessagesByUserUid(currentUser.userUid);
      queryParams.user = "current";
    } else if (
      currentUserIsMember &&
      filter !== undefined &&
      search !== undefined
    ) {
      // search by filter
      messageResult = await selectMessagesByFilter(
        filter as string,
        search as string,
        pageNumber,
        MESSAGE_LIMIT
      );
      queryParams.filter = filter as string;
      queryParams.search = search as string;
    } else if (
      currentUserIsMember === false &&
      filter === undefined &&
      search !== undefined
    ) {
      // search by title
      messageResult = await selectMessagesByFilter(
        "title",
        search as string,
        pageNumber,
        MESSAGE_LIMIT
      );
      queryParams.filter = "title";
      queryParams.search = search as string;
    } else {
      // find latest messages
      messageResult = await selectLatestMessages(pageNumber, MESSAGE_LIMIT);
    }
    //

    const messagesModified = messageResult.map((msg) => ({
      ...msg,
      isMember: currentUserIsMember,
      isCurrentAuthor: msg.userUid === currentUser.userUid,
      createdAt: timeDistance(msg.createdAt),
    }));

    const hasQueryParams = Object.keys(queryParams).length > 0;

    return res.status(StatusCodes.OK).render("pages/messages", {
      isAuth: req.isAuthenticated(),
      messages: messagesModified,
      isCurrentMember: currentUserIsMember,
      currentPage: pageNumber,
      pageLimit: MESSAGE_LIMIT,
      prevPath: `/messages?page=${pageNumber - 1}${
        hasQueryParams ? `$${encode(queryParams)}` : ""
      }`,
      nextPath: `/messages?page=${pageNumber + 1}${
        hasQueryParams ? `$${encode(queryParams)}` : ""
      }`,
    });
  } catch (error) {
    return next(error);
  }
};
const getMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messageUid } = req.params;
    const currentUser = req.user as AppUserType;

    const message = await selectMessageByUid(messageUid as string);
    const messagesModified = {
      ...message,
      createdAt: timeDistance(message?.createdAt as string),
      dateCreated: dateCreated(message?.createdAt as string),
    };

    const isCurrentAuthor = currentUser.userUid === message?.userUid;
    const isCurrentMember = currentUser.member;

    let messageAuthor: AppUserType | undefined = undefined;
    if (!isCurrentAuthor && isCurrentMember) {
      messageAuthor = await selectUser(message?.userUid as string);
    }

    res.status(StatusCodes.OK).render("pages/message-details", {
      isAuth: req.isAuthenticated(),
      message: messagesModified,
      author: messageAuthor || currentUser,
      isCurrentAuthor,
      isCurrentMember,
    });
  } catch (error) {
    return next(error);
  }
};

// CREATE
const createMessageView = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.OK).render("pages/message-form", {
    actionPath: `/messages/new`,
    edit: false,
    values: {
      title: "",
      text: "",
    },
    errors: [],
  });
};

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, text } = matchedData(req);
    const currentUser = req.user as AppUserType;

    await insertMessage(currentUser.userUid, title, text);

    return res.status(StatusCodes.CREATED).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

// EDIT
const editMessageView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messageUid } = req.params;
    const currentUser = req.user as AppUserType;
    const message = await selectMessageByUid(messageUid as string);

    if (message === undefined || message.userUid !== currentUser.userUid) {
      return res.status(StatusCodes.BAD_REQUEST).render("pages/error", {
        isAuth: req.isAuthenticated(),
        heading: `Bad Request`,
        message: `You can't edit this message!`,
      });
    }

    return res.status(StatusCodes.OK).render("pages/message-form", {
      actionPath: `/messages/${messageUid}/edit`,
      edit: true,
      values: {
        title: message.title,
        text: message.text,
      },
      errors: [],
    });
  } catch (error) {
    return next(error);
  }
};

const editMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messageUid } = req.params;
    const { text, title } = matchedData(req);
    await updateMessage(messageUid as string, title, text);
    return res.status(StatusCodes.OK).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

// DELETE
const deleteMessageView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messageUid } = req.params;
    const currentUser = req.user as AppUserType;
    const message = await selectMessageByUid(messageUid as string);

    if (message === undefined || message.userUid !== currentUser.userUid) {
      return res.status(StatusCodes.BAD_REQUEST).render("pages/error", {
        isAuth: req.isAuthenticated(),
        heading: `Bad Request`,
        message: `You can't edit this message!`,
      });
    }

    return res.status(StatusCodes.OK).render("pages/confirm-delete", {
      isAuth: req.isAuthenticated(),
      confirmPath: `/messages/${messageUid}/delete`,
      cancelPath: `/messages`,
      heading: `Delete message`,
      text: `Are you sure you want to delete "${message.title}" message. This action is permanent!`,
    });
  } catch (error) {
    return next(error);
  }
};
const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messageUid } = req.params;
    await deleteMessageByUid(messageUid as string);
    res.status(StatusCodes.OK).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

export {
  getMessages,
  getMessage,
  createMessageView,
  createMessage,
  editMessageView,
  editMessage,
  deleteMessageView,
  deleteMessage,
};
