import { takeLatest, call, put, take, select, race, delay } from 'redux-saga/effects';

import actions from '../userActions';

import * as auth from '../api';
import * as errors from '../../errors/errorsSlice';
import { ILoginResponse } from '../apiResponses';
import { RootState } from '../../../app/store';
import { LoggedInState } from '../login/LoggedInState';
import { differenceInMilliseconds, isFuture } from 'date-fns';
import { push } from 'connected-react-router';

function* initAuthorization() {
    try {
        const loginData: ILoginResponse = yield call(auth.refreshAccessToken);
        yield put(actions.tryInitUserSuccess(loginData));
    }
    catch(error) {
        yield put(actions.tryInitUserFailure());
    }
}

function* login(action) {
    try {
        const data: ILoginResponse = yield call(auth.login, action.payload);
        yield put(actions.loginSuccess(data));
        yield put(push('/'));
    }
    catch(error) {
        yield put(actions.loginFailure());
        yield put(errors.setError(error.apiErrorData));
    }
}

function* logout() {

    // access token is removed when we call logout so we are logged out even on error
    // if there is an error refresh token might not be deleted on server
    try {
        yield call(auth.logout);
    }
    catch(error) { }

    yield put(actions.logoutSuccess())
}

function* refreshToken() {
    try {
        const loginData: ILoginResponse = yield call(auth.refreshAccessToken);
        yield put(actions.refreshAccessTokenSuccess(loginData));
        return true;
    }
    catch(error) {
        return false;
    }
}

function* refreshAccessTokenLoop() {

    const maxFailedAttempts = 10;
    let failedAttempts = 0;

    while(true) {
        const tokenExpiresAt: number | null = yield select((state: RootState) => state.authorization.login.tokenExpiresAt);

        if(tokenExpiresAt && isFuture(tokenExpiresAt)) {
            // start refresh before it expires
            const delayTime = Math.floor(differenceInMilliseconds(tokenExpiresAt, new Date()) * 0.7);
            yield delay(delayTime);
        }
        
        const tokenRefreshed = yield call(refreshToken);

        if(tokenRefreshed) {
            failedAttempts = 0;
        }
        else {
            failedAttempts++;
        }

        if(failedAttempts > maxFailedAttempts) {
            // this shouldn't happen unless the server is down but if it is we don't want to fire loads of requests so bail out
            return;
        }
    }
}

function* authSaga(action) {
    yield call(initAuthorization);

    while(true) {

        const loggedInState: LoggedInState = yield select((state: RootState) => state.authorization.login.loggedInState);

        if(loggedInState !== LoggedInState.LoggedIn) {
            const loginCredentials = yield take(actions.loginRequest);
            const loginSuccess = yield call(login, loginCredentials);

            if(!loginSuccess) {
                continue;
            }
        }

        // wait for logout or the refresh loop to bail out
        yield race({
            signOutAction: take(actions.logoutRequest),
            refreshTokenLoop: call(refreshAccessTokenLoop)
        });
    
        yield call(logout);
    }

}

export function* watchAuthSaga() {
    yield takeLatest(actions.tryInitUserRequest, authSaga);
}