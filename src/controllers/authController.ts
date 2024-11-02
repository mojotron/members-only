import { Request, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { genSalt, hash } from "bcrypt";
//
import { insertUser } from "../db/queries.js";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = matchedData(req);

    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    await insertUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(StatusCodes.OK).redirect("/log-in");
  } catch (error) {
    return next(error);
  }
};
export { signUp };
