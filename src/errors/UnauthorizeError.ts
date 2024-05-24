import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';

class UnauthorizeError extends CustomApiError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizeError;
