import { takeLatest, call, put, all, fork } from 'redux-saga/effects';

import * as actions from './tagDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';

export function* loadTagSaga(action) {
    try {
        const data = yield call(api.loadTag, action.payload);
        yield put(actions.loadTagSuccess(data));
    }
    catch(error) {
        yield put(actions.loadTagFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagSaga() {
    yield takeLatest(actions.loadTagRequest, loadTagSaga);
}

export function* updateTagSaga(action) {
    try {
        const data = yield call(api.updateTag, action.payload);
        yield put(actions.updateTagSuccess(data));
    }
    catch(error) {
        yield put(actions.updateTagFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchUpdateTagSaga() {
    yield takeLatest(actions.updateTagRequest, updateTagSaga);
}

function* tagDetailsSaga() {
    yield all([
        fork(watchLoadTagSaga),
        fork(watchUpdateTagSaga)
    ]);
}

export default tagDetailsSaga;
