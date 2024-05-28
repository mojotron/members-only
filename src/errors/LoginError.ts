import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';

class LoginError extends CustomApiError {
  statusCode: number;

  errorObject: { [key: string]: string };

  inputValues: { username?: string; password?: string };

  constructor(
    message: string,
    errorObject: { [key: string]: string },
    inputValues: { username?: string; password?: string },
  ) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.errorObject = errorObject;
    this.inputValues = inputValues;
  }
}

export default LoginError;
