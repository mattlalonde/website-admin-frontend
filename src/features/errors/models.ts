export type ErrorType = 'ApiError' | 'ValidationError' | 'Unknown';

export interface ISubErrorData {
    type: ErrorType;
    message: string;
}

export interface IErrorData {
    type: ErrorType;
    message: string;
    subErrors?: Array<ISubErrorData> | null;
}

export const defaultError: IErrorData = {
    type: 'Unknown',
    message: 'An unknown error occured'
}
  