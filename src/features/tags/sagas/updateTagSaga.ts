import { takeLatest, call, put } from 'redux-saga/effects';

import tagActions from '../tagActions';
import * as errors from '../../errors/errorsSlice';
import * as api from '../api';
import { ITag } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* updateTagSaga(action) {
    const response: IApiResponse<ITag> = yield call(api.updateTag, action.payload);

    if(response.ok && response.body) {
        yield put(tagActions.updateTagSuccess(response.body));
    }
    else {
        yield put(tagActions.updateTagFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchUpdateTagSaga() {
    yield takeLatest(tagActions.updateTagRequest, updateTagSaga);
}