import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const getIndexView = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render("pages/index");
};

export { getIndexView };
