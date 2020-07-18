import { all, fork } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';

function* userSagas() {
    yield all([
        fork(watchAuthSaga)
    ]);
}

export default userSagas;
