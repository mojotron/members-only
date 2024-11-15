import { StatusCodes } from "http-status-codes";
import CustomError from "./CustomError.js";

const errorMessage =
  "We encountered error connecting database, please try again later!";

class DatabaseError extends CustomError {
  statusCode: number;

  constructor(message: string = errorMessage) {
    super(message);
    this.statusCode = StatusCodes.SERVICE_UNAVAILABLE;
  }
}

export default DatabaseError;
