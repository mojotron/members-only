import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

const errorMessage = `You are not authenticated! Please log in or create account by sign up.`;

class UnauthorizedError extends CustomError {
  statusCode: number;

  constructor(message: string = errorMessage) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
