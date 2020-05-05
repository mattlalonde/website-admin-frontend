import { takeEvery, call, put, all, fork } from 'redux-saga/effects';

import * as tagCreateActions from './tagCreateSlice';
import * as tagListActions from '../list/tagListSlice';
import * as errors from '../../errors/errorsSlice';
import { createTag } from '../api';

export function* createTagSaga(action) {
    try {
        const data = yield call(createTag, action.payload);
        yield put(tagCreateActions.createTagSuccess(data));
        yield put(tagCreateActions.setCreateTagPopupVisibility(false));
        yield put(tagListActions.addTagToList(data));
    }
    catch(error) {
        yield put(tagCreateActions.createTagFailed());
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchCreateTagSaga() {
    yield takeEvery(tagCreateActions.createTagRequest, createTagSaga);
}

function* createTagSagaRoot() {
    yield all([
        fork(watchCreateTagSaga)
    ]);
}

export default createTagSagaRoot;