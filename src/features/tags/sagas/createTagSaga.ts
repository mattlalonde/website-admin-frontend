import { takeEvery, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import { createTag } from '../api';
import { IApiResponse } from '../../../utils/api/http';
import { ITag } from '../models';
import { defaultError } from '../../errors/models';

function* createTagSaga(action) {

    const response: IApiResponse<ITag> = yield call(createTag, action.payload);

    if(response.ok && response.body) {
        yield put(tagActions.createTagSuccess(response.body));
    }
    else {
        yield put(tagActions.createTagFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchCreateTagSaga() {
    yield takeEvery(tagActions.createTagRequest, createTagSaga);
}