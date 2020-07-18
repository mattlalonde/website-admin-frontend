import { LoggedInState } from "./LoggedInState";
import { IUser, UserRoleType } from "../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginRequest } from "../apiRequests";
import { ILoginResponse } from "../apiResponses";

import * as jwtDecode from 'jwt-decode';

export interface ILoggedInUserState {
    loggedInState: LoggedInState,
    user: IUser | null,
    userAccessToken: string | null,
    tokenExpiresAt: number | null
}

interface IAppJwt {
    sub: string;
    iat: number;
    exp: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Array<string>;
}

const initialState: ILoggedInUserState = {
    loggedInState: LoggedInState.InitialisingApp,
    user: null,
    userAccessToken: null,
    tokenExpiresAt: null
}

const loggedInUser = createSlice({
    name: 'loggedInUser',
    initialState,
    reducers: {
        loginRequest(state, action: PayloadAction<ILoginRequest>) {
            state.loggedInState = LoggedInState.LoggingIn;
        },
        loginSuccess(state, action: PayloadAction<ILoginResponse>) {
            const jwt: IAppJwt = jwtDecode(action.payload.accessToken);
            const user: IUser = {
                id: jwt.sub,
                firstName: jwt.firstName,
                lastName: jwt.lastName,
                email: jwt.email,
                roles: jwt.roles.map(r => r as UserRoleType)
            }

            state.user = user;
            state.userAccessToken = action.payload.accessToken;
            state.tokenExpiresAt = jwt.exp * 1000;
            state.loggedInState = LoggedInState.LoggedIn;
        },
        loginFailure(state) {
            state.loggedInState = LoggedInState.LoggedOut;
        },
        logoutRequest(state) {
            state.loggedInState = LoggedInState.LoggingOut;                    
        },
        logoutSuccess(state) {
            state.user = null;
            state.userAccessToken = null;
            state.loggedInState = LoggedInState.LoggedOut;
        },
        tryInitUserRequest(state) {
            state.loggedInState = LoggedInState.InitialisingApp;
        },
        tryInitUserSuccess(state, action: PayloadAction<ILoginResponse>) {
            const jwt: IAppJwt = jwtDecode(action.payload.accessToken);
            const user: IUser = {
                id: jwt.sub,
                firstName: jwt.firstName,
                lastName: jwt.lastName,
                email: jwt.email,
                roles: jwt.roles.map(r => r as UserRoleType)
            }

            state.user = user;
            state.userAccessToken = action.payload.accessToken;
            state.tokenExpiresAt = jwt.exp * 1000;
            state.loggedInState = LoggedInState.LoggedIn;
        },
        tryInitUserFailure(state) {
            state.loggedInState = LoggedInState.LoggedOut; 
        },
        refreshAccessTokenSuccess(state, action: PayloadAction<ILoginResponse>) {
            const jwt: IAppJwt = jwtDecode(action.payload.accessToken);
            const user: IUser = {
                id: jwt.sub,
                firstName: jwt.firstName,
                lastName: jwt.lastName,
                email: jwt.email,
                roles: jwt.roles.map(r => r as UserRoleType)
            }

            state.user = user;
            state.userAccessToken = action.payload.accessToken;
            state.tokenExpiresAt = jwt.exp * 1000;
        }
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    tryInitUserRequest,
    tryInitUserSuccess,
    tryInitUserFailure,
    refreshAccessTokenSuccess
} = loggedInUser.actions;

export default loggedInUser.reducer;