import { takeEvery, call, put } from 'redux-saga/effects';

import * as tagCreateActions from './tagCreateSlice';
import * as errors from '../../errors/errorsSlice';
import { createTag } from '../api';

function* createTagSaga(action) {
    try {
        const data = yield call(createTag, action.payload);
        yield put(tagCreateActions.createTagSuccess(data));
        yield put(tagCreateActions.setCreateTagPopupVisibility(false));
        //yield put(tagListActions.addTagToList(data));
    }
    catch(error) {
        yield put(tagCreateActions.createTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchCreateTagSaga() {
    yield takeEvery(tagCreateActions.createTagRequest, createTagSaga);
}