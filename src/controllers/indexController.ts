import { Request, Response, NextFunction } from "express";

const getIndexView = (req: Request, res: Response) => {
  return res.status(200).render("pages/index");
};

export { getIndexView };
