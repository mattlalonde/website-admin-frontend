import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../tagDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import * as api from '../../api';

function* loadTagSaga(action) {
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