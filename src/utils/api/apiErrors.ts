import { IErrorData } from "../../features/errors/models";

export interface IApiErrorData {
    apierror: {
      status: string;
      timestamp: string;
      message: string;
      debugMessage?: string | null;
      subErrors?: Array<SubError> | null;
    }
  }
  
type SubErrorType = 'ValidationError';
  
type SubError = ValidationError;
  
type ValidationError = {
    type: SubErrorType;
    field: string;
    message: string;
    rejectedValue: string | null;
}

export interface ISpringError {
    timestamp: string;
    status: number;
    error: string;
    message: string;
}

export const normalizeError = (error: ISpringError | IApiErrorData): IErrorData => {
    if(error.hasOwnProperty('apierror')) {
        const apiError = error as IApiErrorData;

        const result: IErrorData = {
            type: 'ApiError',
            message: apiError.apierror.message
        }

        if(apiError.apierror.subErrors) {
            result.subErrors = apiError.apierror.subErrors.map(s => ({
                type: s.type,
                message: `${s.field} ${s.message}`
            }));
        }

        return result;
    }
    else {
      const springErrorData = error as ISpringError;

      return {
          type: 'ApiError',
          message: springErrorData.message
      }
    }
}