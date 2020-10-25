import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* loadTagSaga(action) {
    const response: IApiResponse<ITag> = yield call(api.loadTag, action.payload);

    if(response.ok && response.body) {
        yield put(tagActions.loadTagSuccess(response.body));
    }
    else {
        yield put(tagActions.loadTagFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchLoadTagSaga() {
    yield takeLatest(tagActions.loadTagRequest, loadTagSaga);
}