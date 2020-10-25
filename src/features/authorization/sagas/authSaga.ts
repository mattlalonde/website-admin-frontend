import { takeLatest, call, put, take, select, race, delay } from 'redux-saga/effects';

import actions from '../userActions';

import * as auth from '../api';
import * as errors from '../../errors/errorsSlice';
import { ILoginResponse } from '../apiResponses';
import { LoggedInState } from '../login/LoggedInState';
import { differenceInMilliseconds, isFuture } from 'date-fns';
import { push } from 'connected-react-router';
import { getLoggedInState, getTokenExpiresAt } from '../authSelectors';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* initAuthorization() {
    const response: IApiResponse<ILoginResponse> = yield call(auth.refreshAccessToken);
    
    if(response.ok && response.body) {
        yield put(actions.tryInitUserSuccess(response.body));
    }
    else {
        yield put(actions.tryInitUserFailure());
    }
}

function* login(action) {

    const response: IApiResponse<ILoginResponse> = yield call(auth.login, action.payload);

    if(response.ok && response.body) {
        yield put(actions.loginSuccess(response.body));
        yield put(push('/'));
    }
    else {
        yield put(actions.loginFailure());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

function* logout() {

    // access token is removed when we call logout so we are logged out even on error
    // if there is an error refresh token might not be deleted on server
    yield call(auth.logout);

    yield put(actions.logoutSuccess())
}

function* refreshToken() {

    const response: IApiResponse<ILoginResponse> = yield call(auth.refreshAccessToken);

    if(response.ok && response.body) {
        yield put(actions.refreshAccessTokenSuccess(response.body));
        return true;
    }
    else {
        return false;
    }
}

function* refreshAccessTokenLoop() {

    const maxFailedAttempts = 10;
    let failedAttempts = 0;

    while(true) {
        const tokenExpiresAt: number | null = yield select(getTokenExpiresAt());

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

        const loggedInState: LoggedInState = yield select(getLoggedInState());

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