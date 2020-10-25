import { ILoginRequest } from "./apiRequests";
import * as http from '../../utils/api/http';
import { ILoginResponse } from "./apiResponses";
import jwtManager from '../../utils/api/jwtManager';

const root = "/api";

export const login = async (request: ILoginRequest) => {
    const response = await http.post<ILoginResponse>(`${root}/auth/signin`, request);

    if(response.body) {
        jwtManager.setToken(response.body.accessToken);
    }
    
    return response;
}

export const logout = async () => {
    jwtManager.removeToken();
    await http.post(`${root}/auth/signout`);
}

export const refreshAccessToken = async () => {
    const response = await http.post<ILoginResponse>(`${root}/auth/token/refresh`);

    if(response.body) {
        jwtManager.setToken(response.body.accessToken);
    }
        
    return response;
}