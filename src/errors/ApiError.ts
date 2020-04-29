export interface IApiErrorData {
  apierror: {
    status: string;
    timestamp: string;
    message: string;
    debugMessage?: string | null;
    subErrors?: Array<IApiSubErrorData> | null;
  }
}

export type SubErrorType = 'ValidationError';

export interface IApiSubErrorData {
  type: SubErrorType;
}

export interface IValidationError extends IApiSubErrorData {
  field: string;
  message: string;
  rejectedValue: string | null;
}

export class ApiError extends Error {

    apiErrorData: IApiErrorData;

    constructor(message: string, apiErrorData: IApiErrorData) {
      // 'Error' breaks prototype chain here
      super(message); 
      this.apiErrorData = apiErrorData;

      Object.setPrototypeOf(this, new.target.prototype);
    }
  }