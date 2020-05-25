import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../tagSlice';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';

function* loadTagSaga(action) {
    try {
        const data: ITag = yield call(api.loadTag, action.payload);
        yield put(actions.loadTagSuccess(data));
    }
    catch(error) {
        yield put(actions.loadTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagSaga() {
    yield takeLatest(actions.loadTagRequest, loadTagSaga);
}