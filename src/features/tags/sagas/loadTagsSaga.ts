import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../tagSlice';
import * as errors from '../../errors/errorsSlice';
import { loadTags } from '../api';
import { ITagListResponse } from '../models';

function* loadTagsSaga() {
    try { 
        const data: ITagListResponse = yield call(loadTags);
        yield put(actions.loadTagsSuccess(data));
    }
    catch(error) {
        yield put(actions.loadTagsFailed())
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagsSaga() {
    yield takeLatest(actions.loadTagsRequest, loadTagsSaga);
}