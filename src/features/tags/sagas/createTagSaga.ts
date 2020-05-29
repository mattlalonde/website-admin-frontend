import { takeEvery, call, put } from 'redux-saga/effects';

import * as tagActions from '../tagSlice';
import * as errors from '../../errors/errorsSlice';
import { createTag } from '../api';

function* createTagSaga(action) {
    try {
        const data = yield call(createTag, action.payload);
        yield put(tagActions.createTagSuccess(data));
    }
    catch(error) {
        yield put(tagActions.createTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchCreateTagSaga() {
    yield takeEvery(tagActions.createTagRequest, createTagSaga);
}