import { StatusCodes } from 'http-status-codes';
import CustomApiError from './CustomApiError';

class UnathorizeError extends CustomApiError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNATHORIZE;
  }
}

export default UnathorizeError;
