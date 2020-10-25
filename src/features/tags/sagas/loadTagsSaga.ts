import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import { loadTags } from '../api';
import { ITagListResponse } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* loadTagsSaga() {
    const response: IApiResponse<ITagListResponse> = yield call(loadTags);

    if(response.ok && response.body) {
        yield put(tagActions.loadTagsSuccess(response.body));
    }
    else {
        yield put(tagActions.loadTagsFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchLoadTagsSaga() {
    yield takeLatest(tagActions.loadTagsRequest, loadTagsSaga);
}