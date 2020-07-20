import { ApiError, IApiErrorData } from "../errors/ApiError";


interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

interface ISpringError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
}

const processError = (error: ISpringError | IApiErrorData): IApiErrorData => {
  if(error.hasOwnProperty('apierror')) {
    return error as IApiErrorData;
  }
  else {
    const springErrorData = error as ISpringError;
    return {
      apierror: {
        timestamp: springErrorData.timestamp,
        status: springErrorData.status.toString(),
        message: springErrorData.message
      }
    }
  }
}

let accessToken: string | null = null;

async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {

    

    const response: HttpResponse<T> = await fetch(request);
  
    if (!response.ok) {
        const errorData = await response.json();
        throw new ApiError(response.statusText, processError(errorData));
    }

    try {
      // may error if there is no body
      response.parsedBody = await response.json();
    } catch (ex) {}
    
    return response;
  }

  export const setAccessToken = (token: string) => {
    accessToken = token;
  }

  const setAuthorisationHeader = (args: RequestInit) => {
    args.headers = args.headers || {};
    args.headers['Authorization'] = `Bearer ${accessToken}`;

    return args;
  }

  export const removeAuthorizationToken = () => {
    accessToken = null;
  }

  export async function get<T>(
    path: string,
    args: RequestInit = { method: "get" }
  ): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };
  
  export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }
  ): Promise<HttpResponse<T>>  {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };
  
  export async function put<T>(
    path: string,
    body: any = {},
    args: RequestInit = { method: "put", body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } }
  ): Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  };

  export async function del<T>(
    path: string,
    args: RequestInit =  { method: "delete" } 
  ) : Promise<HttpResponse<T>> {
    return await http<T>(new Request(path, setAuthorisationHeader(args)));
  }