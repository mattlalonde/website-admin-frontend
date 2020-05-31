import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import { loadTags } from '../api';
import { ITagListResponse } from '../models';

function* loadTagsSaga() {
    try { 
        const data: ITagListResponse = yield call(loadTags);
        yield put(tagActions.loadTagsSuccess(data));
    }
    catch(error) {
        yield put(tagActions.loadTagsFailed())
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchLoadTagsSaga() {
    yield takeLatest(tagActions.loadTagsRequest, loadTagsSaga);
}