import { IErrorData } from "../../features/errors/models";
import { IApiErrorData, ISpringError, normalizeError } from "./apiErrors";
import jwtManager from './jwtManager';

export interface IApiResponse<T = void> {
  ok: boolean;
  status: number;
  body?: T;
  error?: IErrorData;
}

export async function http<T = void>(request: RequestInfo): Promise<IApiResponse<T>> {

    let response: Response;

    try {
      response = await fetch(request);
    }
    catch(error) {
      return {
        ok: false,
        status: 500,
        error: {
          type: 'ApiError',
          message: 'There was an error connecxting to the server'
        }
      }
    }
  
    if (!response.ok) {
        const errorData: ISpringError | IApiErrorData = await response.json();
        return {
          ok: response.ok,
          status: response.status,
          error: normalizeError(errorData)
        }
    }

    let parsedBody: T | undefined = undefined;
    try{
      parsedBody = await response.json();
    }
    catch(err){}
    

    return {
      ok: response.ok,
      status: response.status,
      body: parsedBody
    }
  }

  const setAuthorisationHeader = (args: RequestInit) => {

    const accessToken = jwtManager.getToken();

    if(accessToken) {
      args.headers = args.headers || {};
      args.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return args;
  }

  export async function get<T = void>(
    path: string,
    args: RequestInit = { method: "get" }
  ): Promise<IApiResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };
  
  export async function post<T = void>(
    path: string,
    body: any = {},
    args: RequestInit = { method: "post", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }
  ): Promise<IApiResponse<T>>  {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };
  
  export async function put<T = void>(
    path: string,
    body: any = {},
    args: RequestInit = { method: "put", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }
  ): Promise<IApiResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };

  export async function del<T = void>(
    path: string,
    args: RequestInit =  { method: "delete" } 
  ) : Promise<IApiResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  }