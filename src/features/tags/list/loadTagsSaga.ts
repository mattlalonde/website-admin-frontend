import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from './tagListSlice';
import * as errors from '../../errors/errorsSlice';
import { loadTags } from '../api';

function* loadTagsSaga() {
    try { 
        const data = yield call(loadTags);
        yield put(actions.loadTagsSuccess(data));
    }
    catch(error) {
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagsSaga() {
    yield takeLatest(actions.loadTagsRequest, loadTagsSaga);
}