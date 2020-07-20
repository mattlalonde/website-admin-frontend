import { ILoginRequest } from "./apiRequests";
import * as http from '../../utils/http';
import { ILoginResponse } from "./apiResponses";
import { ApiError } from "../../errors/ApiError";

const root = "/api";

export const login = async (request: ILoginRequest) => {
    const response = await http.post<ILoginResponse>(`${root}/auth/signin`, request);
    
    if(response.parsedBody) {
        http.setAccessToken(response.parsedBody.accessToken);
        
        return response.parsedBody;
    }
    
    throw ApiError.create('API_ERROR', 'Unable to login');
}

export const logout = async () => {
    http.removeAuthorizationToken();
    await http.post<void>(`${root}/auth/signout`, {});
}

export const refreshAccessToken = async () => {
    const response = await http.post<ILoginResponse>(`${root}/auth/token/refresh`, {});

    if(response.parsedBody) {
        http.setAccessToken(response.parsedBody.accessToken);
        
        return response.parsedBody;
    }
    
    throw ApiError.create('API_ERROR', 'Unable to refresh access token');
}